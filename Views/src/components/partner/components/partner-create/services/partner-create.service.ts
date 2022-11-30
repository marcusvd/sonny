import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation, ToolTips } from "src/shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';

import { PartnerDto } from "src/components/partner/dto/partner-dto";

@Injectable({ providedIn: 'root' })
export class PartnerCreateService extends BackEndService<PartnerDto, number> {


  constructor(
    protected _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,


  ) {
    super(_http, environment._PARTNER);
  }

  public businesslineArray: any[] = [
    { id: 0, businessLine: 'SELECIONE UMA OPÇÃO' },
    { id: 1, businessLine: 'FORNECEDOR HARDWARE' },
    { id: 2, businessLine: 'TÉCNICO DE INFORMÁTICA' },
    { id: 3, businessLine: 'REDE FÍSICA' },
    { id: 4, businessLine: 'MOTOBOY' },
    { id: 5, businessLine: 'REPARO NOTEBOOKS' },
    { id: 6, businessLine: 'REPARO ELETÔNICA GERAL' },
    { id: 7, businessLine: 'OUTROS' },
  ];

  save(form: FormGroup) {

    if (form.get('businessLine').value.toLocaleLowerCase() === 'outros') {
      form.get('businessLine').setValue(form.get('businessLineOther').value);
      form.controls['businessLineOther'].disable();
    }


    const toSave: PartnerDto = { ...form.value };
    this.add$<PartnerDto>(toSave).subscribe({
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
