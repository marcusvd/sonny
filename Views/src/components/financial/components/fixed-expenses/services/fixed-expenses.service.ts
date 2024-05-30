import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { FixedExpensesTrackingDto } from "../../fixed-expenses-trancking/dto/fixed-expenses-tracking-dto";
import { FixedExpensesDto } from "../dto/fixed-expenses-dto";

@Injectable()
export class FixedExpensesService extends BackEndService<FixedExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor)
  }

  makeTrackingEntity(fixedExpenses: FixedExpensesDto): FixedExpensesTrackingDto {

    const trancking = new FixedExpensesTrackingDto()
    trancking.companyId = JSON.parse(localStorage.getItem('companyId'));
    trancking.userId = JSON.parse(localStorage.getItem('userId'))
    trancking.bankAccountId = null;
    trancking.paidBy = null;
    trancking.cardId = null;
    trancking.wasPaid = new Date('0001-01-01T00:00:00Z');
    trancking.registered = new Date();

    if (fixedExpenses.price)
      trancking.price = fixedExpenses.price;
    else
      trancking.price = 0;

    trancking.interest = 0;


    return trancking;
  }

  save(form: FormGroup) {

    if (form.get('nameOther').value)
      form.get('name').setValue(form.get('nameOther').value)

    // switch (<string>form.get('cyclePayment').value) {
    //   case 'DIÁRIO': {
    //     form.get('cyclePayment').setValue(0);
    //     break;
    //   }
    //   case 'MENSAL':{
    //     form.get('cyclePayment').setValue(1);
    //     break;
    //   }
    //   case 'ANUAL':{
    //     form.get('cyclePayment').setValue(2);
    //     break;
    //   }
    // }

    const toSave: FixedExpensesDto = { ...form.value };
    toSave.fixedExpensesTrackings = [];
    toSave.fixedExpensesTrackings.push(this.makeTrackingEntity(toSave));

    console.log(toSave);


    this.add$<FixedExpensesDto>(toSave, 'FnFixedExpenses/AddFixedExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        //  this._route.navigateByUrl(`/side-nav/financial-dash/list-bank-account-cards`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }


}
