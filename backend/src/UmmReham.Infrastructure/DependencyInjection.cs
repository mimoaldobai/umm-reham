using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UmmReham.Domain.Interfaces;
using UmmReham.Infrastructure.Data;
using UmmReham.Infrastructure.Repositories;

namespace UmmReham.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var pgConnection = configuration.GetConnectionString("DefaultConnection");
        var useSqlite = configuration["UseSqliteFallback"] != "false";

        services.AddDbContext<AppDbContext>(options =>
        {
            if (!string.IsNullOrEmpty(pgConnection) && !useSqlite)
            {
                options.UseNpgsql(pgConnection);
            }
            else
            {
                options.UseSqlite("Data Source=ummreham_dev.db");
            }
        });

        // Repositories
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IServiceRepository, ServiceRepository>();
        services.AddScoped<IPortfolioRepository, PortfolioRepository>();
        services.AddScoped<IPageRepository, PageRepository>();
        services.AddScoped<IMenuRepository, MenuRepository>();
        services.AddScoped<IMediaRepository, MediaRepository>();
        services.AddScoped<ITestimonialRepository, TestimonialRepository>();
        services.AddScoped<ISiteSettingRepository, SiteSettingRepository>();
        services.AddScoped<IStatisticRepository, StatisticRepository>();
        services.AddScoped<IFaqRepository, FaqRepository>();
        services.AddScoped<IAgentConversationRepository, AgentConversationRepository>();
        services.AddScoped<IAgentResponseRepository, AgentResponseRepository>();
        services.AddScoped<IServiceRequestRepository, ServiceRequestRepository>();
        services.AddScoped<IArticleRepository, ArticleRepository>();
        services.AddScoped<ISocialLinkRepository, SocialLinkRepository>();
        services.AddScoped<IAppUserRepository, AppUserRepository>();

        return services;
    }
}
