using System.Threading.Tasks;
using Application.Services.Operations.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class EletronicsRepairsController : ControllerBase
    {
        public EletronicsRepairsController(IElectronicRepairServices ELETRONIC_REPAIR_SERVICES)
        {
            _ELETRONIC_REPAIR_SERVICES = ELETRONIC_REPAIR_SERVICES;
        }
        private readonly IElectronicRepairServices _ELETRONIC_REPAIR_SERVICES;

        [HttpPost("PostEletronicRepair")]
        public async Task<IActionResult> PostEletronicRepair([FromBody] ElectronicRepairDto entityDto)
        {
                ElectronicRepairDto entityFromDb = await _ELETRONIC_REPAIR_SERVICES.AddAsync(entityDto);
                return Ok(entityFromDb);
        }
    }
}