import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { TypePaymentDto } from "../dto/type-payment-dto";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { FormGroup } from "@angular/forms";

@Injectable()

export class TypePayCrudService extends BackEndService<TypePaymentDto, number>{
  constructor(
    protected _Http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,

  ) {
    super(_Http, environment._TYPEPAY)
  }

  save(form: FormGroup) {
    const typeP: TypePaymentDto = { ...form.value }
    this.add$<TypePaymentDto>(typeP).subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })
  }


}
