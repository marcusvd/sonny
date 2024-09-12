using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpense : BaseExpense
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        
    }
}