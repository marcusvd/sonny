using System;
using System.Collections.Generic;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class EssentialCycleDtoValidator : AbstractValidator<FinancialEssentialCycleDto>
    {
        public EssentialCycleDtoValidator()
        {
            RuleFor(x => x.WasPaid).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Interest).GreaterThanOrEqualTo(0);
            RuleFor(x => x.PaidBy);
            RuleFor(x => x.EntryRegister);
        }
    }
}