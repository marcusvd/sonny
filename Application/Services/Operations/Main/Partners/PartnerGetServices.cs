using System;
using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using UnitOfWork.Persistence.Contracts;
using Application.Exceptions;
using Pagination.Models;
using Domain.Entities.Main;
using Application.Services.Operations.Main.Partners.Dtos;


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
        public async Task<PartnerDto[]> GetAllAsync()
        {
            List<Partner> entityFromDb = await _GENERIC_REPO.Partners.GetAllAsync();

            if (entityFromDb == null) throw new Exception("Objeto era nulo.");

            return _MAP.Map<PartnerDto[]>(entityFromDb);
        }
        public async Task<List<PartnerDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.Partners.GetAllByCompanyIdAsync(x => x.CompanyId == id);

            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }
        public async Task<List<PartnerDto>> GetAllHardwareVendorByCompanyIdAsync(int companyId)
        {
            List<Partner> fromDb = await _GENERIC_REPO.Partners.GetAllHardwareVendorByCompanyIdAsync(companyId);
            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);
            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            return toReturn;
        }
        public async Task<List<PartnerDto>> GetAllEletronicRepairAsync(int companyId)
        {
            List<Partner> fromDb = await _GENERIC_REPO.Partners.GetAllEletronicRepairAsync(companyId);
            var toReturn = _MAP.Map<List<PartnerDto>>(fromDb);
            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            return toReturn;
        }
        public async Task<PagedList<PartnerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Partners.GetAllPartnersPagedAsync(parameters);

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
        public async Task<int> GetCountByCompanyIdAsync(int id)
        {
            var Count = _GENERIC_REPO.Partners.GetCountByCompanyIdAsync(x => x.CompanyId == id);

            if (Count == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await Count;
        }
        public async Task<int> GetTotalHardwareVendorByCompanyIdAsync(int id)
        {
            var Count = _GENERIC_REPO.Partners.GetTotalHardwareVendorByCompanyIdAsync(id);

            if (Count == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await Count;
        }

    }

}