import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { PartnerDetailsComponent } from "../components/partner-details/partner-details.component";

@Injectable()

export class PartnerListService extends BackEndService<PartnerDto, number>{

  private _partner: PartnerDto;
  constructor(
    private _Dialog: MatDialog,
    protected _Http: HttpClient

  ) {
    super(_Http, environment._PARTNER)
  }

  private _partners: PartnerDto[] = [];
  get partners() {
    return this._partners;
  }
  getAll() {

    this.loadAll$<PartnerDto>().subscribe(
      ((P: PartnerDto[]) => {
        this._partner
        console.log(this._partner)
        this._partners = P;
      }),
      (Error: any) => { console.log(Error) },
    )



  }























}
