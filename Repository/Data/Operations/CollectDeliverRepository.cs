using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using Pagination;
using System;

namespace Repository.Data.Operations
{
    public class CollectDeliverRepository : Repository<CollectDeliver>, ICollectDeliverRepository
    {

        private readonly SonnyDbContext _CONTEXT;
        public CollectDeliverRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<CollectDeliver> GetByIdIncluded(int id)
        {
            // var result = await _CONTEXT.CollectsDelivers.AsNoTracking()
            // .Include(x => x.DestinyAddress)
            // .Include(x => x.SourceAddress)
            // .Include(x => x.Transporter).FirstOrDefaultAsync(x => x.Id == id);

            return null;
        }

        public async Task<PagedList<CollectDeliver>> DateCurrentMonth(Params parameters)
        {
            DateTime CurrentDate = DateTime.Now;

            var result = GetAllPagination().Where(x => x.Start.Month == CurrentDate.Month)

            .Skip((parameters.PgNumber - 1) * parameters.PgSize)
            .Take(parameters.PgSize);

            return await PagedList<CollectDeliver>.ToPagedList(result, parameters.PgNumber, parameters.PgSize);
        }

        public async Task<PagedList<CollectDeliver>> GetAllPaged(Params parameters)
        {
            IQueryable<CollectDeliver> result = _CONTEXT.CollectsDelivers
            .Include(x => x.SourceClient)
            .Include(x => x.DestinyClient)
            .Include(x => x.SourcePartner)
            .Include(x => x.DestinyPartner)
            .Include(x => x.Transporter)
            .Skip((parameters.PgNumber - 1) * parameters.PgSize)
            .Take(parameters.PgSize);

            return await PagedList<CollectDeliver>.ToPagedList(result, parameters.PgNumber, parameters.PgSize);

        }
    }
}