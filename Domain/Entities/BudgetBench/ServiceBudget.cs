using System;
using System.Collections.Generic;

namespace Domain.Entities.BudgetBench
{
    public class ServiceBudget
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public DateTime BudgetStartedIn { get; set; }
        public string Visually { get; set; }
        public string RemoteData { get; set; }
        public string ClientProblems { get; set; }
        public DateTime BenchStartedIn { get; set; }
        public string Status { get; set; }
        public List<SolutionPrice> SolutionsPrices { get; set; }


    }
}
