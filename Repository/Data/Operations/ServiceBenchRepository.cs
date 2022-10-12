using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.BudgetBench;
using Microsoft.EntityFrameworkCore;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class ServiceBenchRepository : Repository<ServiceBench>, IServiceBenchRepository
    {
        private SonnyDbContext _CONTEXT;
        public ServiceBenchRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        // public async Task<List<ServiceBench>> GetAllAsyncIncluded()
        // {

        //     var result = await _CONTEXT.ServicesBench.AsNoTracking()
        //     // .Include(s => s.SolutionsPrices)
        //     .Include(c => c.Client).ToListAsync();

        //     return result;
        // }

        // public async Task<ServiceBench> GetByIdAsyncIncluded(int id)
        // {
        //     var result = await _CONTEXT.ServicesBench.AsNoTracking()
        //     // .Include(s => s.SolutionsPrices)
        //     .Include(c => c.Client)
        //     .FirstOrDefaultAsync(x => x.Id==id);
        //     return result;
        // }

    }
}