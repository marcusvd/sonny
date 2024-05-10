import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";


@Injectable()

export class PartnerListService extends BackEndService<PartnerDto>{

  private _partner: PartnerDto;
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts

  ) {
    super(_http, environment._PARTNERS)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const partner = new PartnerDto();
    partner.id = id;

    this.deleteFake$<PartnerDto>('DeleteFake', partner).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg('4', 11);
          return false;
        }

      }
    );


  }



}
