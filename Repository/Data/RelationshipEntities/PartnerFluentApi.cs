using Domain.Entities;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.RelationshipEntities
{
   #region Partner
    public class PartnerFluentApi : IEntityTypeConfiguration<Partner>
    {
        public void Configure(EntityTypeBuilder<Partner> builder)
        {
            
        }
    }

    #endregion
  
}