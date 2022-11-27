using Api.Entities.Shared.Validators;
using FluentValidation;
using Services.Dto;

namespace Api.Helpers.Validators
{
    public class CustomerValidator : AbstractValidator<CustomerDto>
    {
        public CustomerValidator()
        {
            //Commons
            RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(xx => xx.CNPJ).NotEmpty().NotNull().MinimumLength(8).MaximumLength(100);
            RuleFor(xx => xx.Responsible).NotEmpty().NotNull();
            RuleFor(xx => xx.Comments).MaximumLength(500);
            RuleFor(xx => xx.Registered).NotEmpty().NotNull();
            //Childrens
            RuleFor(xxAddress => xxAddress.Address).SetValidator(new AddressValidator());
            RuleFor(xxContact => xxContact.Contact).SetValidator(new ContactValidator());
            //Payment
            RuleFor(xx => xx.Payment).NotEmpty()
             .NotNull().ScalePrecision(2, 8).GreaterThanOrEqualTo(1)
             .When(xx => xx.Assured, ApplyConditionTo.AllValidators)
             .Equal(0).When(xx => !xx.Assured, ApplyConditionTo.AllValidators);
            //Expiration
            RuleFor(xx => xx.Expiration).NotEmpty()
             .NotNull()
             .GreaterThanOrEqualTo(1).LessThanOrEqualTo(31)
             .When(xx => xx.Assured, ApplyConditionTo.CurrentValidator).When(xx => xx.Assured, ApplyConditionTo.AllValidators)
             .Equal(0).When(xx => !xx.Assured, ApplyConditionTo.AllValidators);
        }
    }
}


