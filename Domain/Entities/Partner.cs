using System;
using Domain.Entities.Shared;
using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Stocks;

namespace Domain.Entities
{
    public class Partner
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public DateTime Registered { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string BusinessLine { get; set; }
        public bool Transporter { get; set; }
        public bool HardwareSupplier { get; set; }
        public bool ElectronicRepair { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public Stock Stocks { get; set; }
        public List<Product> Products { get; set; }
        public List<CollectDeliver> CollectDelivers { get; set; }
        public List<ChargeForm> ChargesForms { get; set; }
        public virtual List<ElectronicRepair> ElectronicsRepairs { get; set; }

    }
}