using System;

namespace Domain.Entities.Outsourced
{
    public class EletronicRepair
    {
        public int Id { get; set; }
        public string Item { get; set; }
        public DateTime EntryDate { get; set; }
        public string Description { get; set; }
        public string Problem { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public Decimal Price { get; set; }
        public int PartnerId { get; set; }
        public Partner Partner { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string solution { get; set; }
        public bool Authorized { get; set; }
        public bool Finished { get; set; }

    }
}
