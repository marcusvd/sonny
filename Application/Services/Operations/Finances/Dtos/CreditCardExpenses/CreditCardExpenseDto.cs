using System;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;

namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseDto : BaseExpenseDto
    {
        public int InstallmentNumber { get; set; }
        public DateTime ExpenseDay { get; set; }


    }
}
