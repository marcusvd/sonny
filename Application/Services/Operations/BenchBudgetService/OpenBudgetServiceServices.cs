using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.ServicesBench;
using Application.Services.Operations.BenchBudgetService.Helper;
using System.Linq;
using Application.Services.Operations.Products.BusinessRulesValidation;

namespace Application.Services.Operations.BenchBudgetService
{
    public class OpenBudgetServiceServices : IOpenBudgetServiceServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public OpenBudgetServiceServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<BudgetServiceDto> OpenServiceAsync(int BudgetServiceId, BudgetServiceDto entityDto)
        {
            if (BudgetServiceId != entityDto.Id)
                throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var TableProvidedServicePrice = await _GENERIC_REPO.TableProvidedServicesPrices.GetAllAsync();
            var servicesPricesFromDb = await _GENERIC_REPO.ServicesPrices.GetAllByIdService(entityDto.Service.Id);

            entityDto.CollectsDeliversCosts = _MAP.Map<CollectDeliverCostsDto>(await _GENERIC_REPO.BudgetsServices.CollectDeliverCostsById(entityDto.CollectsDeliversCosts.Id));

            BudgetServiceOpenUpdateBusinessRuleValidation.ServicePriceIsValid(TableProvidedServicePrice, entityDto.Service.Prices);
            BudgetServiceOpenUpdateBusinessRuleValidation.IsAuthorized(entityDto.Service);
            BudgetServiceOpenUpdateBusinessRuleValidation.StartedFinishedDate(entityDto.Service);

            BudgetServiceHelperOpenService budgetServiceDto = new(_MAP);

            var removeUpdated = budgetServiceDto.ServicesPriceToRemove(entityDto, servicesPricesFromDb);

            if (removeUpdated.Any())
                _GENERIC_REPO.ServicesPrices.RemoveRange(removeUpdated);

            var bsDto = budgetServiceDto.CreatedEntities(TableProvidedServicePrice, entityDto);

            var toUpdate = _MAP.Map<BudgetService>(bsDto);

            _GENERIC_REPO.BudgetsServices.Update(toUpdate);

            if (await _GENERIC_REPO.save())
            {
                var toReturnView = await _GENERIC_REPO.BudgetsServices.GetByIdAsync(x => x.Id == toUpdate.Id);
                return _MAP.Map<BudgetServiceDto>(toReturnView);
            }
            return bsDto;
        }

    }
}