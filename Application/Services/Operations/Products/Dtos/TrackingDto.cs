using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Customers.Dtos;
using Domain.Entities.Authentication;

namespace Application.Services.Operations.Products.Dtos
{
    public class TrackingDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public ProductDto Product { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public string Sn { get; set; }
        public string NfNumber { get; set; }
        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }

    }
}