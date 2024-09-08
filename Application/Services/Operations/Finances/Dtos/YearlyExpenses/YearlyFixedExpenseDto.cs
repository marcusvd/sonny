
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.YearlyExpenses
{
    public class YearlyFixedExpenseDto : BaseExpenseDto
    {
        public List<YearlyFixedExpenseInstallmentDto> YearlyFixedExpensesInstallments { get; set; }
    }
}