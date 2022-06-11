import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ClientDto } from 'src/app/_components/administrative/client/dto/client-dto';
import { NetworkDevicesDto } from 'src/app/_components/administrative/client/technician/infra/dto/network-devices-dto';
import { Helpers } from 'src/app/_shared/helpers/global-helpers';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { Cam } from 'src/app/_shared/useful/cam/camPrincipal';
import { environment } from 'src/environments/environment';
import { DevicesCrudService } from '../../../services/devices-crud.service';


@Component({
  selector: 'app-dash-device',
  templateUrl: './dash-device.component.html',
  styleUrls: ['./dash-device.component.css']
})
export class DashDeviceComponent implements OnInit, OnDestroy {

  private readonly _API_URL_CLIENT: string = `${environment._CLIENTS}`

  public FilteredCliFromObservable: ClientDto[] = [];
  public netDvc: NetworkDevicesDto[] = [];


  private getAll$: Observable<ClientDto[]>;
  private subGetAll: Subscription;
  private ArrayCliFromDb: ClientDto[] = [];
  private _filtroList: string;


  constructor(public _Fv: ValidatorsService,
    public _Fb: FormBuilder,
    public _Cam: Cam,
    public _Helpers: Helpers,
    private _Crud: DevicesCrudService,
    // public _CliService: ClientService
  ) { }

  selectedCli(netDevs: NetworkDevicesDto[]) {
    this.netDvc = netDevs
    console.log(this.netDvc);
  }

  get FilteringString(): string {
    return this._filtroList;
  }

  set FilteringString(value: string) {
    this._filtroList = value;
    this.FilteredCliFromObservable = this.FilteringString ? this.filterClients(this.FilteringString) : this.ArrayCliFromDb;
  }




  filterClients(filterBy: string): ClientDto[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.ArrayCliFromDb.filter(_client => {
      return _client.name.toLocaleLowerCase().includes(filterBy);
    })
  }






  ngOnDestroy(): void {
    this.subGetAll.unsubscribe();
  }

  ngOnInit(): void {

    //observable
    this.getAll$ = this._Crud.loadAll$();
    //subScription
    this.subGetAll = this.getAll$
      .subscribe(
        (ArrayCli: ClientDto[]) => {
          //   this._client = resultGetCli;
          this.ArrayCliFromDb = ArrayCli;
          this.FilteredCliFromObservable = ArrayCli;
        }, error => {
          //  //console.log(error);
        }
      )


  }

}
