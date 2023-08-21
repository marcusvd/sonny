using System;
using Application.Services.Operations.BenchBudgetService.Dtos;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.DtoValidation
{
    public class PriceDtoValidator : AbstractValidator<PriceDto>
    {
        public PriceDtoValidator()
        {
            RuleFor(x => x.ServiceName).NotEmpty().NotNull().MaximumLength(200);
            RuleFor(x => x.PriceService).NotEmpty().NotNull().GreaterThanOrEqualTo(0);
        }
    }
}
