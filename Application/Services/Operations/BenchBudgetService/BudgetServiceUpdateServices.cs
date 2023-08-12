using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.ServicesBench;

namespace Application.Services.Operations.BenchBudgetService
{
    public class BudgetServiceUpdateServices : IBudgetServiceUpdateServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public BudgetServiceUpdateServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<BudgetServiceDto> UpdateAsync(int BudgetServiceId, BudgetServiceDto entityDto)
        {
            if (BudgetServiceId != entityDto.Id)
                throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var toUpdate = _MAP.Map<BudgetService>(entityDto);

            _GENERIC_REPO.BudgetsServices.Update(toUpdate);

            await _GENERIC_REPO.Products.save();

            return entityDto;
        }
        // private List<QuantityDto> QuantitiesHelperUpdateAsync(List<QuantityDto> quantities)
        // {
        //     quantities.ToList().ForEach(x =>
        //                                {
        //                                    x.IsReserved = x.IsReserved != DateTime.MinValue ? DateTime.Now : DateTime.MinValue;
        //                                    x.SoldDate = x.SoldDate != DateTime.MinValue ? DateTime.Now : DateTime.MinValue;

        //                                    ProductUpdateBusinessRuleValidation.QuantitiesValidation(quantities);

        //                                    var sold = x.SoldDate == DateTime.MinValue ? totalProduct++ : 0;
        //                                    sold = x.IsReserved != DateTime.MinValue ? totalProduct-- : 0;
        //                                    var reserved = x.IsReserved != DateTime.MinValue ? totalProductReserved++ : 0;

        //                                });
        //     return quantities;
        // }
        // private async Task<List<Tracking>> TrakingsHelperUpdateAsync(ProductDto entityDto)
        // {
        //     entityDto.Quantities.ToList().ForEach(x =>
        //     {
        //         if (x.SoldDate != DateTime.MinValue)
        //         {
        //             trackings.Add(new Tracking
        //             {
        //                 ProductId = x.ProductId,
        //                 CostPrice = x.CostPrice,
        //                 SoldPrice = x.SoldPrice,
        //                 Sn = x.Sn,
        //                 NfNumber = x.NfNumber,
        //                 CustomerId = x.CustomerId,
        //                 UserId = 1
        //             });
        //         }
        //     });

        //     var fromDbTraking = await _GENERIC_REPO.Products.GetProductByIdByStockIdTrakingIncludedAsync(entityDto.StockId, entityDto.Id);

        //     fromDbTraking.Trackings.ToList().ForEach(x =>
        //                 {
        //                     trackings.ToList().ForEach(y =>
        //                         {
        //                             if (x.NfNumber == y.NfNumber)
        //                             {
        //                                 if (x.Sn == y.Sn)
        //                                     trackings.Remove(y);
        //                             }
        //                         });
        //                 });
        //     return trackings;
        // }
        // private async Task<Product> AssignmentsHelperUpdateAsync(ProductDto entityDto)
        // {
        //     var product = await _GENERIC_REPO.Products.GetProductByIdByStockIdAsync
        //   (x => x.StockId == entityDto.StockId, y => y.Id == entityDto.Id);

        //     var toUpdate = (product = _MAP.Map<Product>(entityDto));

        //     toUpdate.AvailableQuantity = totalProduct;
        //     toUpdate.QuantityReserved = totalProductReserved;
        //     toUpdate.Status = totalProduct == 0 ? StatusEnum.unavailable : StatusEnum.available;

        //     return toUpdate;
        // }

    }
}