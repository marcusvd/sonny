using System;

namespace Domain.Entities
{
    public class CollectDeliver
    {
        public int Id { get; set; }

        public string TransporterNoregisterd { get; set; }
        public int? TransporterId { get; set; }
        public Partner Transporter { get; set; }
        public string Subject { get; set; }

        //SOURCE
        public int? SourceClientId { get; set; }
        public ClientEntity SourceClient { get; set; }
        public int? SourcePartnerId { get; set; }
        public Partner SourcePartner { get; set; }
        public int? SourceCompanyId { get; set; }
        public Company SourceCompany { get; set; }
        public string SourceNoRegisterName { get; set; }
        public string SourceNoRegisterAddress { get; set; }

        //DESTINY
        public int? DestinyClientId { get; set; }
        public ClientEntity DestinyClient { get; set; }
        public int? DestinyPartnerId { get; set; }
        public Partner DestinyPartner { get; set; }
        public int? DestinyCompanyId { get; set; }
        public Company DestinyCompany { get; set; }
        public string DestinyNoRegisterName { get; set; }
        public string DestinyNoRegisterAddress { get; set; }

        public DateTime Start { get; set; }
        public int? Price { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }
    }
}
