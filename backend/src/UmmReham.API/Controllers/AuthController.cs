using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using UmmReham.Application.DTOs;
using UmmReham.Domain.Interfaces;

namespace UmmReham.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAppUserRepository _userRepo;
    private readonly IConfiguration _config;

    public AuthController(IAppUserRepository userRepo, IConfiguration config)
    {
        _userRepo = userRepo;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto dto)
    {
        var user = await _userRepo.GetByUsernameAsync(dto.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { message = "اسم المستخدم أو كلمة المرور غير صحيحة" });

        if (!user.IsActive)
            return Unauthorized(new { message = "الحساب معطل" });

        var key = _config["Jwt:Key"] ?? "UmmReham_SuperSecret_Key_2024_SaudiArabia_Academic_Platform_!@#";
        var expirationHours = int.Parse(_config["Jwt:ExpirationHours"] ?? "24");
        var expiresAt = DateTime.UtcNow.AddHours(expirationHours);

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            }),
            Expires = expiresAt,
            Issuer = _config["Jwt:Issuer"] ?? "UmmReham",
            Audience = _config["Jwt:Audience"] ?? "UmmRehamAdmin",
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        user.LastLoginAt = DateTime.UtcNow;
        await _userRepo.UpdateAsync(user);

        return Ok(new LoginResponseDto(
            tokenHandler.WriteToken(token),
            user.Username,
            user.FullName ?? "",
            user.Role,
            expiresAt));
    }

    // ==========================================
    // USER MANAGEMENT ENDPOINTS
    // ==========================================
    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _userRepo.GetAllAsync();
        return Ok(users.Select(u => new UserDto(
            u.Id, u.Username, u.Email, u.FullName,
            u.Role, u.AvatarUrl, u.IsActive, u.LastLoginAt, u.CreatedAt)));
    }

    [HttpPost("users")]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Email))
            return BadRequest(new { message = "اسم المستخدم والبريد الإلكتروني مطلوبان" });

        var existingUser = await _userRepo.GetByUsernameAsync(dto.Username);
        if (existingUser != null)
            return BadRequest(new { message = "اسم المستخدم مسجل مسبقاً" });

        var entity = new Domain.Entities.AppUser
        {
            Username = dto.Username.Trim().ToLower(),
            Email = dto.Email.Trim().ToLower(),
            FullName = dto.FullName?.Trim() ?? dto.Username,
            Role = dto.Role ?? "consultant",
            IsActive = dto.IsActive,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(string.IsNullOrWhiteSpace(dto.Password) ? "admin123" : dto.Password)
        };

        await _userRepo.AddAsync(entity);

        return Ok(new UserDto(
            entity.Id, entity.Username, entity.Email, entity.FullName,
            entity.Role, entity.AvatarUrl, entity.IsActive, entity.LastLoginAt, entity.CreatedAt));
    }

    [HttpPut("users/{id}")]
    public async Task<ActionResult<UserDto>> UpdateUser(Guid id, [FromBody] UpdateUserDto dto)
    {
        var user = await _userRepo.GetByIdAsync(id);
        if (user == null) return NotFound(new { message = "المستخدم غير موجود" });

        user.Username = dto.Username.Trim().ToLower();
        user.Email = dto.Email.Trim().ToLower();
        user.FullName = dto.FullName?.Trim() ?? user.FullName;
        user.Role = dto.Role ?? user.Role;
        user.IsActive = dto.IsActive;

        if (!string.IsNullOrWhiteSpace(dto.Password))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        await _userRepo.UpdateAsync(user);

        return Ok(new UserDto(
            user.Id, user.Username, user.Email, user.FullName,
            user.Role, user.AvatarUrl, user.IsActive, user.LastLoginAt, user.CreatedAt));
    }

    [HttpDelete("users/{id}")]
    public async Task<ActionResult> DeleteUser(Guid id)
    {
        var user = await _userRepo.GetByIdAsync(id);
        if (user == null) return NotFound();

        // Protect primary admin from deletion
        if (user.Username.Equals("admin", StringComparison.OrdinalIgnoreCase))
            return BadRequest(new { message = "لا يمكن حذف حساب المدير العام الرئيسي" });

        await _userRepo.DeleteAsync(id);
        return NoContent();
    }
}
