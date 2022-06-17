using System;

namespace Domain.Entities
{
    public class Card
    {
        public int Id { get; set; }
        public string Holder { get; set; }
        public string Flag { get; set; }
        public string Typeaccount { get; set; }
        public string Numbercard { get; set; }
        public int Checkcode { get; set; }
        public string Description { get; set; }
        public DateTime Validate { get; set; }
    }
}