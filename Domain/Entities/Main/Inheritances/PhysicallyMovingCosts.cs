namespace Domain.Entities.Main.Inheritances
{
    public class PhysicallyMovingCosts
    {
        public PhysicallyMovingCosts()
        {
            
        }
        public PhysicallyMovingCosts(decimal fuel, decimal apps, decimal publicTransport, decimal motoBoy)
        {
            Fuel = fuel;
            Apps = apps;
            PublicTransport = publicTransport;
            MotoBoy = motoBoy;
        }
        public int Id { get; set; }
        public decimal Fuel { get; set; }
        public decimal Apps { get; set; }
        public decimal PublicTransport { get; set; }
        public decimal MotoBoy { get; set; }
        public bool Deleted {get; set;}
    }
}