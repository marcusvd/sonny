
namespace Application.Services.Operations.Finances.Dtos
{
    public class PixDto
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public int BankAccountId { get; set; }
        public BankAccountDto BankAccount { get; set; }
    }
}