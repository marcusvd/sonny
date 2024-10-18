using System.Threading.Tasks;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.FinancingsLoansExpenses;

namespace Application.Services.Operations.Finances.CommonForServices
{
  public interface ICommonForFinancialServices
  {
    Task<BankAccount> GetBankAccountByIdUpdateBalance(int bankId, decimal totalPriceInvoice);
    Task<FinancingAndLoanExpense> FinancingPaidOff(int financingAndLoanId);
    Task<CreditCardLimitOperation> CreditCardLimitOperationUpdateAsync(int cardId, int userId, decimal pricePaid);
  }
}