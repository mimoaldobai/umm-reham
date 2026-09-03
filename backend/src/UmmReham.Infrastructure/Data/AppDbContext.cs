using Microsoft.EntityFrameworkCore;
using UmmReham.Domain.Entities;

namespace UmmReham.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<PortfolioItem> PortfolioItems => Set<PortfolioItem>();
    public DbSet<Page> Pages => Set<Page>();
    public DbSet<Menu> Menus => Set<Menu>();
    public DbSet<MenuItem> MenuItems => Set<MenuItem>();
    public DbSet<Media> MediaFiles => Set<Media>();
    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
    public DbSet<SiteSetting> SiteSettings => Set<SiteSetting>();
    public DbSet<Statistic> Statistics => Set<Statistic>();
    public DbSet<Faq> Faqs => Set<Faq>();
    public DbSet<AgentConversation> AgentConversations => Set<AgentConversation>();
    public DbSet<AgentResponse> AgentResponses => Set<AgentResponse>();
    public DbSet<ServiceRequest> ServiceRequests => Set<ServiceRequest>();
    public DbSet<Article> Articles => Set<Article>();
    public DbSet<SocialLink> SocialLinks => Set<SocialLink>();
    public DbSet<AppUser> AppUsers => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ========================
        // CATEGORY
        // ========================
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("categories");
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.IsActive);
            entity.Property(e => e.Metadata).HasColumnType("jsonb");
        });

        // ========================
        // SERVICE
        // ========================
        modelBuilder.Entity<Service>(entity =>
        {
            entity.ToTable("services");
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.IsActive);
            entity.HasIndex(e => e.IsFeatured);
            entity.HasIndex(e => e.CategoryId);
            entity.Property(e => e.AvailableOptions).HasColumnType("jsonb");
            entity.Property(e => e.GalleryImages).HasColumnType("jsonb");
            entity.Property(e => e.Metadata).HasColumnType("jsonb");
            entity.Property(e => e.PriceMin).HasColumnType("decimal(10,2)");
            entity.Property(e => e.PriceMax).HasColumnType("decimal(10,2)");

            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Services)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // PORTFOLIO ITEM
        // ========================
        modelBuilder.Entity<PortfolioItem>(entity =>
        {
            entity.ToTable("portfolio_items");
            entity.HasIndex(e => e.ServiceId);
            entity.HasIndex(e => e.CategoryId);
            entity.Property(e => e.GalleryImages).HasColumnType("jsonb");
            entity.Property(e => e.Files).HasColumnType("jsonb");
            entity.Property(e => e.Tags).HasColumnType("jsonb");
            entity.Property(e => e.Metadata).HasColumnType("jsonb");

            entity.HasOne(e => e.Service)
                  .WithMany(s => s.PortfolioItems)
                  .HasForeignKey(e => e.ServiceId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(e => e.Category)
                  .WithMany(c => c.PortfolioItems)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // PAGE
        // ========================
        modelBuilder.Entity<Page>(entity =>
        {
            entity.ToTable("pages");
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.IsPublished);
            entity.Property(e => e.Sections).HasColumnType("jsonb");
            entity.Property(e => e.Metadata).HasColumnType("jsonb");

            entity.HasOne(e => e.Parent)
                  .WithMany(p => p.Children)
                  .HasForeignKey(e => e.ParentId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // MENU & MENU ITEMS
        // ========================
        modelBuilder.Entity<Menu>(entity =>
        {
            entity.ToTable("menus");
        });

        modelBuilder.Entity<MenuItem>(entity =>
        {
            entity.ToTable("menu_items");
            entity.Property(e => e.Metadata).HasColumnType("jsonb");

            entity.HasOne(e => e.Menu)
                  .WithMany(m => m.Items)
                  .HasForeignKey(e => e.MenuId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Parent)
                  .WithMany(mi => mi.Children)
                  .HasForeignKey(e => e.ParentId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(e => e.Page)
                  .WithMany()
                  .HasForeignKey(e => e.PageId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // MEDIA
        // ========================
        modelBuilder.Entity<Media>(entity =>
        {
            entity.ToTable("media");
            entity.HasIndex(e => e.Folder);
            entity.Property(e => e.Dimensions).HasColumnType("jsonb");
            entity.Property(e => e.Metadata).HasColumnType("jsonb");
        });

        // ========================
        // TESTIMONIAL
        // ========================
        modelBuilder.Entity<Testimonial>(entity =>
        {
            entity.ToTable("testimonials");

            entity.HasOne(e => e.Service)
                  .WithMany(s => s.Testimonials)
                  .HasForeignKey(e => e.ServiceId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // SITE SETTINGS
        // ========================
        modelBuilder.Entity<SiteSetting>(entity =>
        {
            entity.ToTable("site_settings");
            entity.HasIndex(e => e.Key).IsUnique();
        });

        // ========================
        // STATISTIC
        // ========================
        modelBuilder.Entity<Statistic>(entity =>
        {
            entity.ToTable("statistics");
            entity.Property(e => e.Metadata).HasColumnType("jsonb");
        });

        // ========================
        // FAQ
        // ========================
        modelBuilder.Entity<Faq>(entity =>
        {
            entity.ToTable("faqs");

            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Faqs)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // AGENT CONVERSATION
        // ========================
        modelBuilder.Entity<AgentConversation>(entity =>
        {
            entity.ToTable("agent_conversations");
            entity.HasIndex(e => e.SessionId);
            entity.Property(e => e.Messages).HasColumnType("jsonb");
            entity.Property(e => e.Metadata).HasColumnType("jsonb");

            entity.HasOne(e => e.DetectedService)
                  .WithMany()
                  .HasForeignKey(e => e.DetectedServiceId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // AGENT RESPONSE
        // ========================
        modelBuilder.Entity<AgentResponse>(entity =>
        {
            entity.ToTable("agent_responses");
            entity.Property(e => e.TriggerKeywords).HasColumnType("jsonb");
            entity.Property(e => e.FollowUpOptions).HasColumnType("jsonb");
        });

        // ========================
        // SERVICE REQUEST
        // ========================
        modelBuilder.Entity<ServiceRequest>(entity =>
        {
            entity.ToTable("service_requests");
            entity.HasIndex(e => e.Status);
            entity.Property(e => e.Files).HasColumnType("jsonb");
            entity.Property(e => e.AdditionalDetails).HasColumnType("jsonb");

            entity.HasOne(e => e.Service)
                  .WithMany(s => s.ServiceRequests)
                  .HasForeignKey(e => e.ServiceId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // ARTICLE
        // ========================
        modelBuilder.Entity<Article>(entity =>
        {
            entity.ToTable("articles");
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.IsPublished);
            entity.Property(e => e.Tags).HasColumnType("jsonb");

            entity.HasOne(e => e.Author)
                  .WithMany(u => u.Articles)
                  .HasForeignKey(e => e.AuthorId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Articles)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ========================
        // SOCIAL LINK
        // ========================
        modelBuilder.Entity<SocialLink>(entity =>
        {
            entity.ToTable("social_links");
        });

        // ========================
        // APP USER
        // ========================
        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.ToTable("app_users");
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
        });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}
