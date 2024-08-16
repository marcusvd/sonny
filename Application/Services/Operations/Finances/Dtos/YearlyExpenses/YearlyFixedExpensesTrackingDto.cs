using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.Inheritance;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos
{
    public class YearlyFixedExpensesTrackingDto : BaseExpensesTrackingDto
    {
        public int YearlyFixedExpensesId { get; set; }
        public YearlyFixedExpensesDto YearlyFixedExpenses { get; set; }
        public DateTime Start { get; set; }
        public DateTime Expiration { get; set; }
    }
}