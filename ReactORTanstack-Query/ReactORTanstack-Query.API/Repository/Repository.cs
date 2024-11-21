using Microsoft.EntityFrameworkCore;
using ReactORTanstack_Query.API.Data;
using ReactORTanstack_Query.API.Repository.IRepository;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ReactORTanstack_Query.API.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ReactQueryDbContext _db;
        public DbSet<T> _dbSet;
        public Repository(ReactQueryDbContext db)
        {
            this._db = db;
            _dbSet = db.Set<T>();
        }
        public async Task<T> CreateAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _db.SaveChangesAsync();
            return entity;
        }

        public async Task<T> DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await _db.SaveChangesAsync();
            return entity;
        }

        public async Task<List<T>> GetAllAsync(string? includeProperties = null,
    Expression<Func<T, bool>>? filter = null,
    int pageIndex = 1,
    int pageSize = 5)
        {
           IQueryable<T> query = _dbSet;
            // Apply filtering if a filter expression is provided
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (!string.IsNullOrEmpty(includeProperties))
            {
                // Split the included properties and include them one by one
                foreach (var includeProperty in includeProperties.Split(",", StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty.Trim());
                }
            }
            // Apply pagination
            query = query.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return await query.ToListAsync();
        }



        public async Task<T?> GetAsync(Expression<Func<T, bool>> expression, string? includeProperties = null)
        {
            IQueryable<T> query = _dbSet; // Start with the DbSet

            // Add included properties if any
            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var includeProperty in includeProperties.Split(",", StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty.Trim());
                }
            }

            // Apply the filter and fetch the entity
            return await query.FirstOrDefaultAsync(expression);
        }
        public async Task UpdateAsyncRange(IEnumerable<T> entities)
        {
            _dbSet.UpdateRange(entities);
            await _db.SaveChangesAsync();
        }
        public async Task<int> GetTotalCountAsync(Expression<Func<T, bool>>? filter = null)
        {
            if (filter != null)
            {
                return await _dbSet.CountAsync(filter);
            }
            return await _dbSet.CountAsync();
        }


        public async Task<T> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
