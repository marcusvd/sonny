import { Component, OnInit, Output } from '@angular/core';

import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'address-v2',
  templateUrl: './address-v2.component.html',
  styleUrls: ['./address-v2.component.css'],
  providers: []
})
export class AddressV2Component implements OnInit {

  districtCityStateCols: number = 3;
  districtCityStateRowHeight: string = '120px';

  streetNumberCols: number = 2;
  streetNumberRowHeight: string = '120px';

  constructor(
    private _addressService: AddressService,
  ) { }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  get formMain() {
    return this?._addressService?.formMain;
  }

  query(cep: string) {
    this?._addressService?.query(cep);
  }

  screen() {
    this._addressService.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.districtCityStateCols = 1;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 1;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'small': {
            this.districtCityStateCols = 1;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 1;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'medium': {
            this.districtCityStateCols = 2;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 2;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'large': {
            this.districtCityStateCols = 3;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 2;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'xlarge': {
            this.districtCityStateCols = 3;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 2;
            this.streetNumberRowHeight = '120px';
            break;
          }
        }
      }
    })




  }

  ngOnInit(): void {
    this._addressService.formLoad();
  }

}
