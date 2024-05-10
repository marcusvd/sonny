using System;
using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Pagination.Models;
using Domain.Entities.Main;
using Application.Services.Operations.Main.Partners.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Domain.Entities.Main.Enums;

namespace Application.Services.Operations.Main.Partners
{
    public class PartnerGetServices : IPartnerGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerGetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP

                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Partners.Get(x => x.CompanyId == id && x.Deleted != true).ToListAsync();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }


        public async Task<List<PartnerDto>> GetByCompanyIdIncludedPhysicallyMovingCosts(int companyId)
        {
            var entityFromDb = await _GENERIC_REPO.Partners.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.PhysicallyMovingCosts),
                selector => selector).ToListAsync();

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<List<PartnerDto>>(entityFromDb);

            return toReturnViewDto;
        }





        public async Task<List<PartnerDto>> GetAllHardwareVendorByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true && predicate.PartnerBusiness == PartnerBusinessEnum.HardwareSupplier).ToListAsync();

            // fromDb = fromDb.Where(x => x.PartnerBusiness == PartnerBusinessEnum.HardwareSupplier).ToList();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);
            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<List<PartnerDto>> GetAllTransportersByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.
            Get(
                predicate => predicate.CompanyId == companyId && predicate.PartnerBusiness == PartnerBusinessEnum.Transporter && predicate.Deleted != true ,
                null,
                selector => selector,
                orderBy => orderBy.OrderBy(x => x.Name),
                null
            ).ToListAsync();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);
            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<List<PartnerDto>> GetAllEletronicRepairAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Partners.Get(predicate => predicate.CompanyId == companyId && predicate.Deleted != true ).Where(x => x.PartnerBusiness == PartnerBusinessEnum.ElectronicRepair).ToListAsync();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<PagedList<PartnerDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<Partner>, IOrderedQueryable<Partner>> orderBy = null;

            var fromDb = await _GENERIC_REPO.Partners.GetPaged(
              parameters,
                                         predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.Contact)
                                         .Include(x => x.Address),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<PartnerDto> ViewDto = _MAP.Map<List<PartnerDto>>(fromDb);

            var PgDto = new PagedList<PartnerDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;

        }

        public async Task<int> GetTotalByCompanyIdAsync(int id)
        {
             var fromDb = await _GENERIC_REPO.Partners.Get(x => x.CompanyId == id && x.Deleted != true ).ToListAsync();

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn.Count;
        }
    }

}