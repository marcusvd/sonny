using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class OsRemoveEquipament
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public string Client { get; set; }
        public string Usr { get; set; }
        public string Pwd { get; set; }
        public string Model { get; set; }
        public string Equipament { get; set; }
        public string Problem { get; set; }
    }
}