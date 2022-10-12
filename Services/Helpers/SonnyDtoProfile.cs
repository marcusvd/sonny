using AutoMapper;
using Services.Dto;
using Services.Dto.CollectsDelivers;
using Domain.Entities;
using Pagination;
using Services.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;
using Domain.Entities.CollectionDelivery;

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
            
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<BusinessBox, BusinessBoxDto>().ReverseMap();

            CreateMap<ClientEntity, ClientDto>().ReverseMap();

            CreateMap<Card, CardDto>().ReverseMap();

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
            CreateMap<CheckingAccount, CheckingAccountDto>().ReverseMap();

            CreateMap<TypePayment, TypePaymentDto>().ReverseMap();
            CreateMap<Equipament, EquipamentDto>().ReverseMap();

            CreateMap<OsRemoveEquipament, OsRemoveEquipamentDto>().ReverseMap();

            CreateMap<DailyInFlow, DailyInFlowDto>().ReverseMap();

            CreateMap<DailyOutFlow, DailyOutFlowDto>().ReverseMap();

            CreateMap<MonthlyOutFlow, MonthlyOutFlowDto>().ReverseMap();

            CreateMap<SupplierTypePayment, SupplierTypePaymentDto>().ReverseMap();
        }
    }
}


