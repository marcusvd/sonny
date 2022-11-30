using System;
namespace Services.Dto
{
    public class InventoryDto
    {
        public int Id { get; set; }
        public string Equipament { get; set; }
        public decimal Cost { get; set; }
        public decimal Saleprice { get; set; }
        public bool IsNew { get; set; }
        public bool Istested { get; set; }
        public bool Sold { get; set; }
        public PartnerDto Partner { get; set; }
        public int Warranty { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public string Sn { get; set; }
        public string Driver { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Generation { get; set; }
        public string Capacity { get; set; }
        public string Speed { get; set; }
        public string Comment { get; set; }
        public string Historical { get; set; }
    }
}