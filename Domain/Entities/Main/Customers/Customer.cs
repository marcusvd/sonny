using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.StkProduct;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Enums;
using Domain.Entities.Finances;
using System;
using Domain.Entities.Shared;

namespace Domain.Entities.Main.Customers
{

    public class Customer : MainEntitiesBase
    {
        public Customer()
        {

        }
        public Customer(
                    int companyId,
                    string name,
                    string responsible,
                    string cnpj,
                    DateTime registered,
                    string description,
                    string businessLine,
                    Address address,
                    Contact contact,
                    bool assured,
                    decimal payment,
                    int expiration,
                    bool disabled,
                    decimal discount,
                    AdditionalCosts additionalCosts,
                    TypeCustomerEnum customerType,
                    PhysicallyMovingCosts physicallyMovingCosts
                        )
        {
            CompanyId = companyId;
            Name = name;
            Responsible = responsible;
            CNPJ = cnpj;
            Registered = registered;
            Description = description;
            BusinessLine = businessLine;
            Address = address;
            Contact = contact;
            Assured = assured;
            Payment = payment;
            Expiration = expiration;
            Disabled = disabled;
            Discount = discount;
            AdditionalCosts = additionalCosts;
            CustomerType = customerType;
            PhysicallyMovingCosts = physicallyMovingCosts;
        }
        public bool Assured { get; set; }
        public decimal Payment { get; set; }
        public int Expiration { get; set; }
        public bool Disabled { get; set; }
        public decimal Discount { get; set; }
        public AdditionalCosts AdditionalCosts { get; set; }
        public TypeCustomerEnum CustomerType { get; set; }
        public List<Tracking> Trackings { get; set; }
        public List<BudgetService> ServicesExecuted { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
        public List<FinancialExpensesNotPredictable> ExpensesNotPredictables { get; set; }
    }

}
