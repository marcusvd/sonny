using System;
using Domain.Entities.Shared;
using System.Collections.Generic;
using Domain.Entities.Outsourced;

namespace Domain.Entities
{
    public class Partner
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Registered { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string BusinessLine { get; set; }
        public bool Transporter { get; set; }
        public bool HardwareSupplier { get; set; }
        public bool EletronicRepair { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<Inventory> Inventories { get; set; }
        public List<CollectDeliver> CollectDelivers { get; set; }
        public virtual List<EletronicRepair> EletronicsRepairs { get; set; }

    }
}