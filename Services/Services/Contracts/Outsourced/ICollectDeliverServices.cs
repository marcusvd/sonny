using System.Threading.Tasks;
using Services.Dto.CollectsDelivers;

namespace Services.Services.Contracts.Outsourced
{
    public interface ICollectDeliverServices
    {
        Task<CollectDeliverDto> AddAsync(CollectDeliverDto record);
        //  Task<PagedListDto<CollectDeliverToView>> GetIntervalDatePagedAsync(PgParams pgParams);
        //  Task<PagedListDto<CollectDeliverDto>> GetCurrentDatePagedAsync(PgParams pgParams);
        //  Task<PagedListDto<CollectDeliverDto>> GetAllPagedAsync(PgParams parameters);

    }
}