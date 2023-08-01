using System;
using System.Collections.Generic;

namespace Domain.Entities.Stocks
{
    public class Product
    {
        public int Id { get; set; }
        public int StockId { get; set; }
        public Stock Stock { get; set; }
        public int NameId { get; set; }
        public EquipamentType Name { get; set; }
        public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public int SupplierId { get; set; }
        public Partner Supplier { get; set; }
        public string Model { get; set; }
        public StatusEnum Status { get; set; }
        public int QuantityReserved { get; set; }
        public int AvailableQuantity { get; set; }
        public List<Quantity> Quantities { get; set; }
        public List<Tracking> Trackings { get; set; }
        public string NormalizedName { get; set; }
        public string Description { get; set; }
    }
}