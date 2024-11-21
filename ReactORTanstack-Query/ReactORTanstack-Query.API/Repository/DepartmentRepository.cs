using ReactORTanstack_Query.API.Data;
using ReactORTanstack_Query.API.Models.Domain;
using ReactORTanstack_Query.API.Repository.IRepository;

namespace ReactORTanstack_Query.API.Repository
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(ReactQueryDbContext db) : base(db)
        {
        }
    }
}
