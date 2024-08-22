import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { CategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/category-expense-dto";
import { SubcategoryExpenseDto } from "../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto";
import { YearlyFixedExpenseTrackingDto } from "../../yearly-fixed-expenses-trancking/dto/yearly-fixed-expense-tracking-dto";




export class YearlyFixedExpenseDto {
  id: number;
  companyId: number;
  company: CompanyDto;
  userId: number;
  categoryExpense: CategoryExpenseDto;
  subcategoryExpense: SubcategoryExpenseDto;
  description: string;
  expires: Date;
  start: Date;
  registered: Date;
  price: number;
  autoRenew: boolean;
  linkCopyBill: string;
  userLinkCopyBill: string;
  passLinkCopyBill: string;
  deleted: boolean;
  yearlyFixedExpensesTrackings: YearlyFixedExpenseTrackingDto[];
}
