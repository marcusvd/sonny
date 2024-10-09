import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { PixExpenseDto } from "../../../dto/pix-expense-dto";


@Injectable()
export class PixExpensesService extends BackEndService<PixExpenseDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._VARIABLE_EXPENSES)
  }

 

  save(form: FormGroup) {

    const toSave: PixExpenseDto = { ...form.value };
    // toSave.expiration = new Date(new Date().getFullYear(), new Date().getMonth(), form.get('expiration').value)
    // toSave.userId = JSON.parse(localStorage.getItem('userId'));


    this.add$<PixExpenseDto>(toSave, 'AddVariableExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
          this._route.navigateByUrl(`/side-nav/financial-dash/list-variable-expenses`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })



  }

  // AddFillers(name: string) {


  //   const toSave: MonthFixedExpensesFillersDto = { id: 0, expensesName: name, companyId: JSON.parse(localStorage.getItem('companyId')), deleted: false };

  //   this.add$<MonthFixedExpensesFillersDto>(toSave, 'AddFixedExpensesFillers').subscribe({
  //     next: () => {
  //       //  this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
  //       //  this._route.navigateByUrl(`/side-nav/financial-dash/list-bank-account-cards`)
  //     },
  //     error: (erroCode) => {
  //       console.log(erroCode)
  //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //     }
  //   })
  // }


}
