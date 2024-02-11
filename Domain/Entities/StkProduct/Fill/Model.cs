using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Fill.StkProduct
{
    public class Model
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}