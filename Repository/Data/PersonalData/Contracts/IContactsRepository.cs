using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Shared;
using Repository.Contracts;

namespace Repository.Data.PersonalData.Contracts
{
    public interface IContactsRepository : IRepository<Contact>
    {
        Task<Contact> GetByIdAllIncludedAsync(int id);
    }
}