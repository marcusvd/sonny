namespace Domain.Entities.ServicesBench
{
    public class CollectDeliverCosts
    {
        public int Id { get; set; }
        public bool IsHaveCost { get; set; }
        public bool RoundTrip { get; set; } = false;
        public string CostFrom {get; set;}
        public decimal Price { get; set; }
        public decimal ApartPrice { get; set; }
    }
}