using Microsoft.EntityFrameworkCore;
using UmmReham.Domain.Entities;
using UmmReham.Domain.Interfaces;
using UmmReham.Infrastructure.Data;

namespace UmmReham.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id) => await _dbSet.FindAsync(id);

    public virtual async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.OrderBy(e => e.CreatedAt).ToListAsync();

    public virtual async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(Guid id) => await _dbSet.AnyAsync(e => e.Id == id);

    public async Task<int> CountAsync() => await _dbSet.CountAsync();
}

// ========================
// CATEGORY REPOSITORY
// ========================
public class CategoryRepository : Repository<Category>, ICategoryRepository
{
    public CategoryRepository(AppDbContext context) : base(context) { }

    public async Task<Category?> GetBySlugAsync(string slug)
        => await _dbSet.FirstOrDefaultAsync(c => c.Slug == slug);

    public async Task<IEnumerable<Category>> GetActiveAsync()
        => await _dbSet.Where(c => c.IsActive).OrderBy(c => c.SortOrder).ToListAsync();

    public async Task<Category?> GetWithServicesAsync(string slug)
        => await _dbSet.Include(c => c.Services.Where(s => s.IsActive).OrderBy(s => s.SortOrder))
                       .FirstOrDefaultAsync(c => c.Slug == slug);
}

// ========================
// SERVICE REPOSITORY
// ========================
public class ServiceRepository : Repository<Service>, IServiceRepository
{
    public ServiceRepository(AppDbContext context) : base(context) { }

    public async Task<Service?> GetBySlugAsync(string slug)
        => await _dbSet.Include(s => s.Category).FirstOrDefaultAsync(s => s.Slug == slug);

    public async Task<IEnumerable<Service>> GetActiveAsync()
        => await _dbSet.Include(s => s.Category)
                       .Where(s => s.IsActive)
                       .OrderBy(s => s.SortOrder)
                       .ToListAsync();

    public async Task<IEnumerable<Service>> GetByCategoryAsync(Guid categoryId)
        => await _dbSet.Where(s => s.CategoryId == categoryId && s.IsActive)
                       .OrderBy(s => s.SortOrder)
                       .ToListAsync();

    public async Task<IEnumerable<Service>> GetFeaturedAsync()
        => await _dbSet.Include(s => s.Category)
                       .Where(s => s.IsFeatured && s.IsActive)
                       .OrderBy(s => s.SortOrder)
                       .ToListAsync();

    public async Task<Service?> GetWithDetailsAsync(string slug)
        => await _dbSet.Include(s => s.Category)
                       .Include(s => s.PortfolioItems.Where(p => p.IsActive))
                       .Include(s => s.Testimonials.Where(t => t.IsActive))
                       .FirstOrDefaultAsync(s => s.Slug == slug);
}

// ========================
// PORTFOLIO REPOSITORY
// ========================
public class PortfolioRepository : Repository<PortfolioItem>, IPortfolioRepository
{
    public PortfolioRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<PortfolioItem>> GetActiveAsync()
        => await _dbSet.Include(p => p.Service).Include(p => p.Category)
                       .Where(p => p.IsActive)
                       .OrderByDescending(p => p.CompletedAt)
                       .ToListAsync();

    public async Task<IEnumerable<PortfolioItem>> GetByCategoryAsync(Guid categoryId)
        => await _dbSet.Where(p => p.CategoryId == categoryId && p.IsActive)
                       .OrderByDescending(p => p.CompletedAt)
                       .ToListAsync();

    public async Task<IEnumerable<PortfolioItem>> GetByServiceAsync(Guid serviceId)
        => await _dbSet.Where(p => p.ServiceId == serviceId && p.IsActive)
                       .OrderByDescending(p => p.CompletedAt)
                       .ToListAsync();

    public async Task<IEnumerable<PortfolioItem>> GetFeaturedAsync()
        => await _dbSet.Include(p => p.Service).Include(p => p.Category)
                       .Where(p => p.IsFeatured && p.IsActive)
                       .ToListAsync();
}

// ========================
// PAGE REPOSITORY
// ========================
public class PageRepository : Repository<Page>, IPageRepository
{
    public PageRepository(AppDbContext context) : base(context) { }

    public async Task<Page?> GetBySlugAsync(string slug)
        => await _dbSet.FirstOrDefaultAsync(p => p.Slug == slug);

    public async Task<IEnumerable<Page>> GetPublishedAsync()
        => await _dbSet.Where(p => p.IsPublished)
                       .OrderBy(p => p.SortOrder)
                       .ToListAsync();
}

// ========================
// MENU REPOSITORY
// ========================
public class MenuRepository : Repository<Menu>, IMenuRepository
{
    public MenuRepository(AppDbContext context) : base(context) { }

    public async Task<Menu?> GetByLocationAsync(string location)
        => await _dbSet.FirstOrDefaultAsync(m => m.Location == location && m.IsActive);

    public async Task<Menu?> GetWithItemsAsync(string location)
        => await _dbSet.Include(m => m.Items.Where(i => i.IsActive).OrderBy(i => i.SortOrder))
                       .FirstOrDefaultAsync(m => m.Location == location && m.IsActive);
}

// ========================
// MEDIA REPOSITORY
// ========================
public class MediaRepository : Repository<Media>, IMediaRepository
{
    public MediaRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Media>> GetByFolderAsync(string folder)
        => await _dbSet.Where(m => m.Folder == folder)
                       .OrderByDescending(m => m.CreatedAt)
                       .ToListAsync();
}

// ========================
// TESTIMONIAL REPOSITORY
// ========================
public class TestimonialRepository : Repository<Testimonial>, ITestimonialRepository
{
    public TestimonialRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Testimonial>> GetActiveAsync()
        => await _dbSet.Include(t => t.Service)
                       .Where(t => t.IsActive)
                       .OrderBy(t => t.SortOrder)
                       .ToListAsync();

    public async Task<IEnumerable<Testimonial>> GetFeaturedAsync()
        => await _dbSet.Include(t => t.Service)
                       .Where(t => t.IsFeatured && t.IsActive)
                       .OrderBy(t => t.SortOrder)
                       .ToListAsync();
}

// ========================
// SITE SETTING REPOSITORY
// ========================
public class SiteSettingRepository : ISiteSettingRepository
{
    private readonly AppDbContext _context;

    public SiteSettingRepository(AppDbContext context) => _context = context;

    public async Task<IEnumerable<SiteSetting>> GetAllAsync()
        => await _context.SiteSettings.OrderBy(s => s.GroupName).ThenBy(s => s.Key).ToListAsync();

    public async Task<IEnumerable<SiteSetting>> GetPublicAsync()
        => await _context.SiteSettings.Where(s => s.IsPublic).ToListAsync();

    public async Task<SiteSetting?> GetByKeyAsync(string key)
        => await _context.SiteSettings.FirstOrDefaultAsync(s => s.Key == key);

    public async Task<SiteSetting> UpsertAsync(string key, string value, string valueType = "text", string group = "general")
    {
        var existing = await GetByKeyAsync(key);
        if (existing != null)
        {
            existing.Value = value;
            existing.ValueType = valueType;
            existing.GroupName = group;
            existing.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return existing;
        }
        var setting = new SiteSetting { Key = key, Value = value, ValueType = valueType, GroupName = group };
        await _context.SiteSettings.AddAsync(setting);
        await _context.SaveChangesAsync();
        return setting;
    }
}

// ========================
// STATISTIC REPOSITORY
// ========================
public class StatisticRepository : Repository<Statistic>, IStatisticRepository
{
    public StatisticRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Statistic>> GetBySectionAsync(string section)
        => await _dbSet.Where(s => s.Section == section && s.IsActive)
                       .OrderBy(s => s.SortOrder)
                       .ToListAsync();

    public async Task<IEnumerable<Statistic>> GetActiveAsync()
        => await _dbSet.Where(s => s.IsActive).OrderBy(s => s.SortOrder).ToListAsync();
}

// ========================
// FAQ REPOSITORY
// ========================
public class FaqRepository : Repository<Faq>, IFaqRepository
{
    public FaqRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Faq>> GetActiveAsync()
        => await _dbSet.Include(f => f.Category)
                       .Where(f => f.IsActive)
                       .OrderBy(f => f.SortOrder)
                       .ToListAsync();

    public async Task<IEnumerable<Faq>> GetByCategoryAsync(Guid categoryId)
        => await _dbSet.Where(f => f.CategoryId == categoryId && f.IsActive)
                       .OrderBy(f => f.SortOrder)
                       .ToListAsync();
}

// ========================
// AGENT CONVERSATION REPOSITORY
// ========================
public class AgentConversationRepository : Repository<AgentConversation>, IAgentConversationRepository
{
    public AgentConversationRepository(AppDbContext context) : base(context) { }

    public async Task<AgentConversation?> GetBySessionAsync(string sessionId)
        => await _dbSet.FirstOrDefaultAsync(a => a.SessionId == sessionId && a.Status == "active");
}

// ========================
// AGENT RESPONSE REPOSITORY
// ========================
public class AgentResponseRepository : Repository<AgentResponse>, IAgentResponseRepository
{
    public AgentResponseRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<AgentResponse>> GetByAgentTypeAsync(string agentType)
        => await _dbSet.Where(a => a.AgentType == agentType && a.IsActive)
                       .OrderBy(a => a.SortOrder)
                       .ToListAsync();

    public async Task<IEnumerable<AgentResponse>> GetByIntentAsync(string agentType, string intent)
        => await _dbSet.Where(a => a.AgentType == agentType && a.Intent == intent && a.IsActive)
                       .OrderBy(a => a.SortOrder)
                       .ToListAsync();

    public async Task<AgentResponse?> FindByKeywordsAsync(string agentType, string message)
    {
        var responses = await _dbSet
            .Where(a => a.AgentType == agentType && a.IsActive)
            .ToListAsync();

        // Simple keyword matching - Phase 1
        foreach (var response in responses)
        {
            var keywords = System.Text.Json.JsonSerializer.Deserialize<List<string>>(response.TriggerKeywords);
            if (keywords != null && keywords.Any(k => message.Contains(k, StringComparison.OrdinalIgnoreCase)))
            {
                return response;
            }
        }
        return null;
    }
}

// ========================
// SERVICE REQUEST REPOSITORY
// ========================
public class ServiceRequestRepository : Repository<ServiceRequest>, IServiceRequestRepository
{
    public ServiceRequestRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<ServiceRequest>> GetByStatusAsync(string status)
        => await _dbSet.Include(r => r.Service)
                       .Where(r => r.Status == status)
                       .OrderByDescending(r => r.CreatedAt)
                       .ToListAsync();

    public async Task<ServiceRequest> UpdateStatusAsync(Guid id, string status)
    {
        var request = await _dbSet.FindAsync(id) ?? throw new KeyNotFoundException($"ServiceRequest {id} not found");
        request.Status = status;
        await _context.SaveChangesAsync();
        return request;
    }

    public async Task<ServiceRequest?> FindByTrackingCodeOrPhoneAsync(string query)
    {
        var clean = query.Trim();
        var requests = await _dbSet.Include(r => r.Service).ToListAsync();
        return requests.FirstOrDefault(r => 
            (!string.IsNullOrEmpty(r.AdditionalDetails) && r.AdditionalDetails.Contains(clean, StringComparison.OrdinalIgnoreCase)) ||
            (!string.IsNullOrEmpty(r.ClientPhone) && r.ClientPhone.Contains(clean, StringComparison.OrdinalIgnoreCase)) ||
            r.Id.ToString().StartsWith(clean, StringComparison.OrdinalIgnoreCase) ||
            (!string.IsNullOrEmpty(r.ClientName) && r.ClientName.Contains(clean, StringComparison.OrdinalIgnoreCase))
        );
    }
}

// ========================
// ARTICLE REPOSITORY
// ========================
public class ArticleRepository : Repository<Article>, IArticleRepository
{
    public ArticleRepository(AppDbContext context) : base(context) { }

    public async Task<Article?> GetBySlugAsync(string slug)
        => await _dbSet.Include(a => a.Author).Include(a => a.Category)
                       .FirstOrDefaultAsync(a => a.Slug == slug);

    public async Task<IEnumerable<Article>> GetPublishedAsync()
        => await _dbSet.Include(a => a.Author).Include(a => a.Category)
                       .Where(a => a.IsPublished)
                       .OrderByDescending(a => a.PublishAt ?? a.CreatedAt)
                       .ToListAsync();

    public async Task<IEnumerable<Article>> GetByCategoryAsync(Guid categoryId)
        => await _dbSet.Where(a => a.CategoryId == categoryId && a.IsPublished)
                       .OrderByDescending(a => a.PublishAt ?? a.CreatedAt)
                       .ToListAsync();

    public async Task IncrementViewsAsync(Guid id)
    {
        var article = await _dbSet.FindAsync(id);
        if (article != null)
        {
            article.ViewsCount++;
            await _context.SaveChangesAsync();
        }
    }
}

// ========================
// SOCIAL LINK REPOSITORY
// ========================
public class SocialLinkRepository : Repository<SocialLink>, ISocialLinkRepository
{
    public SocialLinkRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<SocialLink>> GetActiveAsync()
        => await _dbSet.Where(s => s.IsActive).OrderBy(s => s.SortOrder).ToListAsync();
}

// ========================
// APP USER REPOSITORY
// ========================
public class AppUserRepository : Repository<AppUser>, IAppUserRepository
{
    public AppUserRepository(AppDbContext context) : base(context) { }

    public async Task<AppUser?> GetByUsernameAsync(string username)
        => await _dbSet.FirstOrDefaultAsync(u => u.Username == username);

    public async Task<AppUser?> GetByEmailAsync(string email)
        => await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
}
