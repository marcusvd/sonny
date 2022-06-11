import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ClientDto } from '../../../../client/dto/client-dto';
import { ClientCreateService } from '../../../../client/services/client-create.service';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { ServicesBudgetListService } from '../services/services-budget-list.service';
import { MatAccordion } from '@angular/material/expansion';
import { ServicesBudgetInfoEditService } from '../services/services-budget-info-edit.service';


@Component({
  selector: 'service-budget-list',
  templateUrl: './service-budget-list.component.html',
  styleUrls: ['./service-budget-list.component.css'],

})
export class ServiceBudgetListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  collected: boolean;


  constructor(
    private _ServicesBgtSrv: ServicesBudgetListService,

  ) { }

  details(id: number){
  this._ServicesBgtSrv.details(id);
}
  confirm(id: number){
  this._ServicesBgtSrv.createOs(id);
}

  get serviceBudgets() {
    return this._ServicesBgtSrv.getRecordFromDb.filter(x => x.osMake == false);
  }

  get osMakeCheck() {
    return this._ServicesBgtSrv.osMakeCheck
  }



  ngOnInit(): void {
    this._ServicesBgtSrv.loadAllFromDb();
  }

}
