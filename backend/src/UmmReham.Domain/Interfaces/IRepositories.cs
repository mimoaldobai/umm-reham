namespace UmmReham.Domain.Interfaces;

using UmmReham.Domain.Entities;

public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
    Task<int> CountAsync();
}

public interface ICategoryRepository : IRepository<Category>
{
    Task<Category?> GetBySlugAsync(string slug);
    Task<IEnumerable<Category>> GetActiveAsync();
    Task<Category?> GetWithServicesAsync(string slug);
}

public interface IServiceRepository : IRepository<Service>
{
    Task<Service?> GetBySlugAsync(string slug);
    Task<IEnumerable<Service>> GetActiveAsync();
    Task<IEnumerable<Service>> GetByCategoryAsync(Guid categoryId);
    Task<IEnumerable<Service>> GetFeaturedAsync();
    Task<Service?> GetWithDetailsAsync(string slug);
}

public interface IPortfolioRepository : IRepository<PortfolioItem>
{
    Task<IEnumerable<PortfolioItem>> GetActiveAsync();
    Task<IEnumerable<PortfolioItem>> GetByCategoryAsync(Guid categoryId);
    Task<IEnumerable<PortfolioItem>> GetByServiceAsync(Guid serviceId);
    Task<IEnumerable<PortfolioItem>> GetFeaturedAsync();
}

public interface IPageRepository : IRepository<Page>
{
    Task<Page?> GetBySlugAsync(string slug);
    Task<IEnumerable<Page>> GetPublishedAsync();
}

public interface IMenuRepository : IRepository<Menu>
{
    Task<Menu?> GetByLocationAsync(string location);
    Task<Menu?> GetWithItemsAsync(string location);
}

public interface IMediaRepository : IRepository<Media>
{
    Task<IEnumerable<Media>> GetByFolderAsync(string folder);
}

public interface ITestimonialRepository : IRepository<Testimonial>
{
    Task<IEnumerable<Testimonial>> GetActiveAsync();
    Task<IEnumerable<Testimonial>> GetFeaturedAsync();
}

public interface ISiteSettingRepository
{
    Task<IEnumerable<SiteSetting>> GetAllAsync();
    Task<IEnumerable<SiteSetting>> GetPublicAsync();
    Task<SiteSetting?> GetByKeyAsync(string key);
    Task<SiteSetting> UpsertAsync(string key, string value, string valueType = "text", string group = "general");
}

public interface IStatisticRepository : IRepository<Statistic>
{
    Task<IEnumerable<Statistic>> GetBySectionAsync(string section);
    Task<IEnumerable<Statistic>> GetActiveAsync();
}

public interface IFaqRepository : IRepository<Faq>
{
    Task<IEnumerable<Faq>> GetActiveAsync();
    Task<IEnumerable<Faq>> GetByCategoryAsync(Guid categoryId);
}

public interface IAgentConversationRepository : IRepository<AgentConversation>
{
    Task<AgentConversation?> GetBySessionAsync(string sessionId);
}

public interface IAgentResponseRepository : IRepository<AgentResponse>
{
    Task<IEnumerable<AgentResponse>> GetByAgentTypeAsync(string agentType);
    Task<IEnumerable<AgentResponse>> GetByIntentAsync(string agentType, string intent);
    Task<AgentResponse?> FindByKeywordsAsync(string agentType, string message);
}

public interface IServiceRequestRepository : IRepository<ServiceRequest>
{
    Task<IEnumerable<ServiceRequest>> GetByStatusAsync(string status);
    Task<ServiceRequest> UpdateStatusAsync(Guid id, string status);
}

public interface IArticleRepository : IRepository<Article>
{
    Task<Article?> GetBySlugAsync(string slug);
    Task<IEnumerable<Article>> GetPublishedAsync();
    Task<IEnumerable<Article>> GetByCategoryAsync(Guid categoryId);
    Task IncrementViewsAsync(Guid id);
}

public interface ISocialLinkRepository : IRepository<SocialLink>
{
    Task<IEnumerable<SocialLink>> GetActiveAsync();
}

public interface IAppUserRepository : IRepository<AppUser>
{
    Task<AppUser?> GetByUsernameAsync(string username);
    Task<AppUser?> GetByEmailAsync(string email);
}
