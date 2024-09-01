using System;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.VariablesDebitsExpenses
{
    public class VariableExpense : BaseExpense
    {
        public string Item { get; set; }
        public string Place { get; set; }
    }
}