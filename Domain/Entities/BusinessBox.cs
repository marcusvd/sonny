using System;

namespace Domain.Entities
{
    public class BusinessBox
    {
        public int Id { get; set; }
        public decimal Balance { get; set; }
        public DateTime Today { get; set; }

    }
}