using System;
using System.Collections.Generic;
using Application.Exceptions;
using Application.Services.Operations.ProductServices.Dtos;
using Domain.Entities.StkProduct;

namespace Application.Services.Operations.Main.Customers.BusinessRulesValidation
{
    public static class ProductUpdateBusinessRuleValidation
    {
        // public static void QuantitiesValidation(List<QuantityDto> quantities)
        // {
        //     quantities.ForEach(x =>
        //     {
        //         //Warranty
        //         if (x.WarrantyEnd.Date < x.EntryDate.Date)
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductWarrantyEnd1);

        //         if (x.WarrantyEnd.Date > x.EntryDate.Date.AddYears(5))
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductWarrantyEnd2);

        //         //Entry Date
        //         if (x.EntryDate.Date == DateTime.MinValue)
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductEntryDate1);

        //         if (x.SoldDate.Date > x.EntryDate.Date)
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductEntryDate2);
        //     });
        // }
    
    
    }
}