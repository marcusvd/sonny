using System;
using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using UnitOfWork.Persistence.Contracts;
using Application.Exceptions;
using Pagination.Models;
using Application.Services.Helpers;
using Domain.Entities.Main;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Shared.Dtos.Pagination;
using Domain.Entities.Main.Enums;

namespace Application.Services.Operations.Main.Partners
{
    public class PartnerAddServices : IPartnerAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerAddServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP

                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<PartnerDto> AddAsync(PartnerDto entityDto)
        {

            if (entityDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            Partner entityToDb = _MAP.Map<Partner>(entityDto);

            entityToDb.Registered = DateTime.Now;
            entityToDb.NormalizedName = entityToDb.Name.RemoveAccentsAndNormalize();

            switch (entityToDb.BusinessLine)
            {
                case "FORNECEDOR HARDWARE":
                    entityToDb.PartnerType = TypePartnerEnum.HardwareSupplier;
                    break;
                case "MOTOBOY / TRANSPORTADOR":
                    entityToDb.PartnerType = TypePartnerEnum.Transporter;
                    break;
                case "REPARO NOTEBOOKS":
                    entityToDb.PartnerType = TypePartnerEnum.ElectronicRepair;
                    break;
                case "REPARO ELETÔNICA GERAL":
                    entityToDb.PartnerType = TypePartnerEnum.ElectronicRepair;
                    break;
                default:
                    entityToDb.PartnerType = TypePartnerEnum.none;
                    break;
            }


            _GENERIC_REPO.Partners.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                Partner entityFromoDb = await _GENERIC_REPO.Partners.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                return _MAP.Map<PartnerDto>(entityFromoDb);
            }

            return entityDto;
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

        public async Task<PagedListDto<PartnerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Partners.GetAllPartnersPagedAsync(parameters);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<PartnerDto> ViewDto = _MAP.Map<List<PartnerDto>>(fromDb);

            var PgDto = new PagedListDto<PartnerDto>()
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
        public async Task<int> GetTotalHardwareVendorPartnersByCompanyId(int id)
        {
            var Count = _GENERIC_REPO.Partners.GetTotalHardwareVendorPartnersByCompanyId(id);

            if (Count == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await Count;
        }



    }

}