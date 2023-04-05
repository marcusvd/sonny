import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { CustomerListService } from "src/components/customer/components/services/customer-list.service";


@Injectable()
export class ServiceBudgetListService extends BackEndService<ServiceBudgetDto, number>{

  private _serviceBudgetFromDb: ServiceBudgetDto[] = [];

  constructor(
    protected _Http: HttpClient,
    //private _loadCustomers: CustomerListService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }

  loadAllBudget() {
    this.loadAll$('GetAllServicesBudgetsIncludedAsync').subscribe((serviceBudgetDto: ServiceBudgetDto[]) => {
      this._serviceBudgetFromDb = serviceBudgetDto;
      // console.log('AQUI', serviceBudgetDto)
    })
  }

  get serviceBudgetFromDb(): ServiceBudgetDto[] {
    return this._serviceBudgetFromDb;
  }

}
