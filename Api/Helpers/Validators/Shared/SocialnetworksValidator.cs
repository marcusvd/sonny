using FluentValidation;
using Services.Dto;

namespace Api.Entities.Shared.Validators
{
    public class SocialnetworksValidator : AbstractValidator<SocialNetworkDto>
    {
        public SocialnetworksValidator()
        {
            RuleFor(xx => xx.Name).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(xx => xx.Url).NotNull().NotEmpty().MaximumLength(150);
        }
    }
}