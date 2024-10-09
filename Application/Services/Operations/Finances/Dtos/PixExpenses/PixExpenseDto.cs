
using System;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;

namespace Application.Services.Operations.Finances.Dtos.PixExpenses
{
    public class PixExpenseDto
    {
        public int Id { get; set; }
        public int PixOutId { get; set; }
        public PixDto PixOut { get; set; }
        public string BenefitedName { get; set; }
        public string BenefitedKey { get; set; }
        public DateTime ExpenseDay { get; set; }
        public bool Deleted { get; set; }
        public DateTime Registered { get; set; }
        public int? MonthlyFixedExpenseId { get; set; }
        public MonthlyFixedExpenseDto MonthlyFixedExpense { get; set; }
        public int? YearlyFixedExpenseId { get; set; }
        public YearlyFixedExpenseDto YearlyFixedExpense { get; set; }
        public int? VariableExpenseId { get; set; }
        public VariableExpenseDto VariableExpense { get; set; }
        public int? FinancingAndLoanExpenseId { get; set; }
        public FinancingAndLoanExpenseDto FinancingAndLoanExpense { get; set; }
        public string Description { get; set; }
    }
}