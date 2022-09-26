import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/components/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "src/components/client/dto/client-dto";
import { ServiceBudgetDto } from "../../dtos/service-budget-dto";


@Injectable()

export class ServicesBudgetToBenchUpdate extends BackEndService<ServiceBudgetDto, number>{

  private _clients: ClientDto[] = [];

  constructor(
    protected _Http: HttpClient,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }

 get clients() {
    return this._clients;
}

loadAllClients() {
    this._Http.get(environment._CLIENTS).subscribe(
      (clients: ClientDto[]) => {
        this._clients = clients;
      },
      (error) => {
        console.log(error)
      },
      () => {
        console.log('complete')
      })
}

  update(form: FormGroup) {
    console.log(form.value)

    const toSave: ServiceBudgetDto = { ...form.value };

      this.update$(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        this._SnackBar.msgCenterTop(`Parceiro`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], form);
      },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },

    )
  }
}
