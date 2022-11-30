using AutoMapper;
using Services.Dto;
using Services.Dto.CollectsDelivers;
using Domain.Entities;
using Pagination;
using Services.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;
using Domain.Entities.CollectionDelivery;
using Domain.Entities.Financial;
using Services.Dto.Financial;
using Domain.Entities.Shared;

namespace Services.Helpers
{
    public class SonnyDtoProfile : Profile
    {
        public SonnyDtoProfile()
        {
            #region BudgetBench
            CreateMap<ServiceBudget, ServiceBudgetDto>().ReverseMap();
            CreateMap<SolutionPrice, SolutionPriceDto>().ReverseMap();
            CreateMap<ServiceBench, ServiceBenchDto>().ReverseMap();
            CreateMap<BenchToCashBox, BenchToCashBoxDto>().ReverseMap();
            #endregion

            #region Financial
            CreateMap<Card, CardDto>().ReverseMap();
            CreateMap<CheckingAccount, CheckingAccountDto>().ReverseMap();
            CreateMap<TypePayment, TypePaymentDto>().ReverseMap();
            CreateMap<EssentialExpense, EssentialExpenseDto>().ReverseMap();
            CreateMap<EssentialExpenseValue, EssentialExpenseValueDto>().ReverseMap();
            CreateMap<FinancingLoan, FinancingLoanDto>().ReverseMap();
            #endregion

            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<Contact, ContactDto>().ReverseMap();
            CreateMap<Inventory, InventoryDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<SubCategory, SubCategoryDto>().ReverseMap();
            CreateMap<Partner, PartnerDto>().ReverseMap();
            //
            CreateMap<CollectDeliver, CollectDeliverDto>().ReverseMap();
            CreateMap<SourceCollectDeliver, SourceCollectDeliverDto>().ReverseMap();
            CreateMap<DestinyCollectDeliver, DestinyCollectDeliverDto>().ReverseMap();
            CreateMap<EletronicRepair, EletronicRepairDto>().ReverseMap();
            CreateMap<SocialNetwork, SocialNetworkDto>().ReverseMap();
            CreateMap<OsRemoveEquipament, OsRemoveEquipamentDto>().ReverseMap();

        }
    }
}


