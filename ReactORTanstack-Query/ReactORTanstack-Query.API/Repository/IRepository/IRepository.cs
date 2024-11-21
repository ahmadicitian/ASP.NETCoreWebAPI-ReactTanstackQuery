using System.Linq.Expressions;

namespace ReactORTanstack_Query.API.Repository.IRepository
{
    public interface IRepository<T>
    {
        Task<T> CreateAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> DeleteAsync(T entity);
        Task UpdateAsyncRange(IEnumerable<T> entities);
        Task<T?> GetAsync(Expression<Func<T,bool>> expression, string? includeProperties = null);
        Task<List<T>> GetAllAsync(string? includeProperties = null,
             Expression<Func<T, bool>>? filter = null,
    int pageIndex = 1,
    int pageSize = 5);

        Task<int> GetTotalCountAsync(Expression<Func<T, bool>>? filter = null);
    }
}
