using System;
using Domain.Entities.Main;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct
{
    public class ItemProductDto: RootBaseDto
    {   public string NfNumber { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public DateTime WarrantyEnd { get; set; }
        public DateTime WarrantyEndLocal { get; set; }
        public bool IsUsed { get; set; } = false;
        public bool IsTested { get; set; }
        public string UsedHistorical { get; set; }
        public int StockId { get; set; }
        public StockDto Stock { get; set; }
        public int SupplierId { get; set; }
        public Partner Supplier { get; set; }
    }
}