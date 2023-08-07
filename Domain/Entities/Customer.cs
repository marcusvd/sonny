using System.Collections.Generic;
using System;
using Domain.Entities.Shared;
using Domain.Entities.Outsourced;
using Domain.Entities.Stocks;
using Domain.Entities.ServicesBench;

namespace Domain.Entities
{

    public class Customer
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public bool Assured { get; set; }
        public bool CustomerType { get; set; }
        public decimal Payment { get; set; }
        public DateTime Registered { get; set; }
        public int Expiration { get; set; }
        public bool Disabled { get; set; }
        public bool ToBusinessBox { get; set; }
        public decimal Discount { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<Tracking> Trackings { get; set; }
        public List<Quantity> Quantities { get; set; }
        public List<BillingFrom> BillingFromCollectsDelivers { get; set; }
        public List<BudgetService> ServicesExecuted { get; set; }
        public List<Destiny> Destinies {get; set;}
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }

 
    }
}
