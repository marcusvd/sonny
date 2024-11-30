using System;

using Application.Services.Shared.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Customers.Dtos;

namespace Application.Services.Operations.StockProduct
{
    public class ItemProductDto : RootBaseDto
    {
        public int StockId { get; set; }
        public StockDto Stock { get; set; }
        public int? IsReservedByUserId { get; set; } = null;
        public MyUserDto IsReservedByUser { get; set; }
        public DateTime IsReserved { get; set; }
        public int? ReservedForCustomerId { get; set; } = null;
        public CustomerDto ReservedForCustomer { get; set; }
        public int SupplierId { get; set; }
        public PartnerDto Supplier { get; set; }
        public string UsedHistoricalOrSupplier { get; set; }
        public string PurchaseInvoiceNumber { get; set; } // Número de Nfe de entrada
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public DateTime WarrantyEnd { get; set; }
        public DateTime WarrantyEndLocal { get; set; }
        public bool IsUsed { get; set; } = false;
        public DateTime IsTested { get; set; } = DateTime.MinValue;
        public int Quantity { get; set; }
    }
}