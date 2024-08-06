import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { MonthFixedExpensesTrackingDto } from "../../dto/month-fixed-expenses-tracking-dto";



@Injectable({ providedIn: 'root' })
export class PayFixedBillsService extends BackEndService<MonthFixedExpensesTrackingDto>{


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,

  ) {
    super(_http, environment.backEndDoor)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const fixedExpensesTracking = new MonthFixedExpensesTrackingDto();
    fixedExpensesTracking.id = id;

    this.deleteFake$<MonthFixedExpensesTrackingDto>('', fixedExpensesTracking).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg(error, 1);
          return false;
        }

      }
    );


  }

  update(url: string, form: FormGroup) {

    const toSave: any = { ...form.value }

    this.update$<any>(url, toSave).subscribe({
      next: (_cli: any) => {
        this._communicationsAlerts.defaultSnackMsg('Pago $', 0, null, 4);
        history.back();
        //this._router.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list/${this.companyId}`);
      },
      error: (err) => {
        console.log(err)
        const erroCode: string = err.error.Message
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
    //   const toSave: MonthFixedExpensesTrackingDto = { ...form.value }

    //  this.update$<MonthFixedExpensesTrackingDto>(url, toSave).subscribe({
    //     next: (_cli: MonthFixedExpensesTrackingDto) => {
    //       this._communicationsAlerts.defaultSnackMsg('Pago $', 0, null, 4);
    //       this._router.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list/${this.companyId}`);
    //     },
    //     error: (err) => {
    //       console.log(err)
    //       const erroCode: string = err.error.Message
    //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
    //     }
    //   })
  }



}
