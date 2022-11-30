import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as _moment from 'moment';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';
import { MsgOperation, ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { InventoryDto } from 'src/components/providers/Inventory/dto/inventory-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { InventoryCreateService } from './services/inventory-create.service';

const moment = _moment;

@Component({
  selector: 'inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']

})
export class InventoryCreateComponent extends BaseForm implements OnInit {

  public isNew: boolean = true;
  private _partner: PartnerDto[] = [];

  equipamentIdManufactorerCols: number;
  equipamentIdManufactorerRowHeight: string = '120px';

  partnerIdSnCols: number;
  partnerIdSnRowHeight: string = '120px';
  otherEquipamentModelCols: number;
  otherEquipamentModelRowHeight: string = '120px';

  costSalepriceCols: number;
  costSalepriceRowHeight: string = '120px';

  todayWarrantyCols: number;
  todayWarrantyRowHeight: string = '160px';

  IstestedIsnewDriverCols: number;
  IstestedIsnewDriverRowHeight: string = '140px';

  generationCapacitySpeedCols: number;
  generationCapacitySpeedRowHeight: string = '140px';

  commentHistoricalCols: number;
  commentHistoricalRowHeight: string = '350px';

  constructor(
    private _InventoryService: InventoryCreateService,
    private _ActRouter: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  messageTooltipNameOther = 'Para um equipamento novo, selecione "OUTROS" no menu acima.'
  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // private valCustom = ValidatorsCustom;
  // get validatorCustom() {
  //   return this.valCustom
  // }


  isNewView() {
    this.isNew = !this.isNew
  }
  get equipaments() {
    return this._InventoryService.equipamentArray;
  }
  get partners() {
    return this._partner;
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {

            this.equipamentIdManufactorerCols = 1;

            this.partnerIdSnCols = 1;

            this.costSalepriceCols = 1;

            this.todayWarrantyCols = 1;

            this.IstestedIsnewDriverCols = 1;

            this.generationCapacitySpeedCols = 1;

            this.commentHistoricalCols = 1;
            this.otherEquipamentModelCols = 1;
            break;
          }
          case 'small': {

            this.equipamentIdManufactorerCols = 1;

            this.partnerIdSnCols = 1;

            this.costSalepriceCols = 1;

            this.todayWarrantyCols = 1;

            this.IstestedIsnewDriverCols = 1;

            this.generationCapacitySpeedCols = 1;

            this.commentHistoricalCols = 1;
            this.otherEquipamentModelCols = 1;
            break;
          }
          case 'medium': {

            this.equipamentIdManufactorerCols = 2;

            this.partnerIdSnCols = 3;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.IstestedIsnewDriverCols = 2;

            this.generationCapacitySpeedCols = 2;

            this.commentHistoricalCols = 2;
            this.otherEquipamentModelCols = 2;
            break;
          }
          case 'large': {

            this.equipamentIdManufactorerCols = 2;

            this.partnerIdSnCols = 2;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.IstestedIsnewDriverCols = 3;

            this.generationCapacitySpeedCols = 3;

            this.commentHistoricalCols = 2;
            this.otherEquipamentModelCols = 2;
            break;
          }
          case 'xlarge': {

            this.equipamentIdManufactorerCols = 2;

            this.partnerIdSnCols = 2;

            this.costSalepriceCols = 2;

            this.todayWarrantyCols = 2;

            this.IstestedIsnewDriverCols = 3;

            this.generationCapacitySpeedCols = 3;

            this.commentHistoricalCols = 2;
            this.otherEquipamentModelCols = 2;
            break;
          }
        }
      }
    })
  }

  equipamentOnChange(value: string) {
    const selected = value;

    if (selected.toLocaleLowerCase() === 'outros') {
      this.formMain.controls['otherEquipament'].enable();
      this.matTooltip.enableDisable = true;
    }
    else if (selected.toLocaleLowerCase() != 'outros') {
      this.formMain.get('otherEquipament').reset();
      this.formMain.controls['otherEquipament'].disable();
      this.matTooltip.enableDisable = false;
    }
  }


  get isNewShowHide() {
    return this._InventoryService.isNewShowHide;
  }
  selectedCat() {
    return this._InventoryService.selectedCat;
  }

  get startDate() {
    return this._InventoryService.startDate;
  }


  save() {

    if (this.alertSave(this.formMain)) {
      this._InventoryService.save(this.formMain);
      this.formLoad();
    }

  }

//test
  // formLoad() {
  //   this.formMain = this._fb.group({
  //     equipament: ['', []],
  //     otherEquipament: ['', []],
  //     cost: ['', []],
  //     saleprice: ['', []],
  //     istested: [false, []],
  //     isnew: [false, []],
  //     partnerId: ['', []],
  //     warranty: ['', []],
  //     entryDate: ['', []],
  //     sn: ['', []],
  //     driver: ['', []],
  //     manufacturer: ['', []],
  //     model: ['', []],
  //     generation: ['', []],
  //     capacity: ['', []],
  //     speed: ['', []],
  //     comment: ['', []],
  //     historical: ['', []],
  //   })
  // }

  formLoad() {
    this.formMain = this._fb.group({
      equipament: ['', [Validators.required,Validators.maxLength(100)]],
      otherEquipament: new FormControl({value:'', disabled:true}, [Validators.required,Validators.maxLength(100)]),
      cost: ['', [Validators.required]],
      saleprice: ['', [Validators.required]],
      istested: [false, []],
      isnew: [false, []],
      partnerId: ['', [Validators.required]],
      warranty: ['', [Validators.required, Validators.min(0)]],
      entryDate: ['', [Validators.required]],
      sn: ['', [Validators.maxLength(24)]],
      driver: ['', [Validators.maxLength(24)]],
      manufacturer: ['', [Validators.required,Validators.maxLength(30)]],
      model: ['', [Validators.required, Validators.maxLength(24)]],
      generation: ['', [Validators.min(1)]],
      capacity: ['', [Validators.maxLength(24)]],
      speed: ['', [Validators.maxLength(24)]],
      comment: ['', [Validators.maxLength(250)]],
      historical: ['', [Validators.maxLength(500)]],
    })
  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this._ActRouter.data.subscribe((obj: any) => {
      this._partner = obj.loaded['partners'] as PartnerDto[];
      this._partner = this._partner.filter(x => x.businessline.toLocaleLowerCase() === 'fornecedor hardware');
    })
  }

}
