using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.FinancingLoansExpenses
{
    public class FinancingAndLoansExpenses : BaseExpenses
    {
        public FinancingAndLoansExpenses()
        {

        }
        public FinancingAndLoansExpenses(int companyId,
                                 string description,
                                 DateTime expires,
                                 string linkCopyBill,
                                 string uSERLinkCopyBill,
                                 string pASSLinkCopyBill
                                )
        {
            CompanyId = companyId;
            // Name = name;
            Description = description;
            Expires = expires;
            LinkCopyBill = linkCopyBill;
            USERLinkCopyBill = uSERLinkCopyBill;
            PASSLinkCopyBill = pASSLinkCopyBill;
        }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int installmentNumber { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<FinancingAndLoansExpensesTracking> FinancingAndLoansExpensesTrackings { get; set; }

    }
}