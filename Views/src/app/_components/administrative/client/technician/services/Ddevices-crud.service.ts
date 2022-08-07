import { HttpClient } from "@angular/common/http";
import { ClientListService } from "../../services/client-list.service.old";
import { environment } from "src/environments/environment";
import { NetworkDevicesDto } from "src/app/_components/administrative/client/technician/infra/dto/network-devices-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { ImgPathDto } from "src/app/_components/administrative/client/technician/infra/dto/img-path-dto";
import { take } from "rxjs/operators";
import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

Injectable()
export class DDevicesCrudService extends BackEndService<NetworkDevicesDto, number> {
  constructor(
    protected _Http: HttpClient
    ) {
      super(_Http, environment._DEVNETWORK);

    }

    putDevices<T>(_API_URL: string, files: File[], model: ClientDto, netDev: NetworkDevicesDto): Observable<ClientDto> {

    // let _netDev: NetWorkDevices = new NetWorkDevices();
    //    let _netWorkDevices: NetWorkDevices[] = new Array<NetWorkDevices>();

    if (files != null) {

      this.upload(files, _API_URL)
        .pipe(take(1))
        .subscribe();
      let path: ImgPathDto[] = new Array<ImgPathDto>();
      files.forEach((item) => {
        let name: string[] = item.name.split('|');
        const Img: ImgPathDto = new ImgPathDto();
        Img.img = `/resources/${model.id}/${name[0]}`
        path.push(Img);
      })
      netDev.images = path
      model.netWorkDevices.push(netDev);
    }

    const client: any = Object.assign(model);

    return this._Http.put<ClientDto>(`{client.id}`, client).pipe(take(1));
  }


  upload(files: File[], _API_URL: string) {
    return this._Http.post(_API_URL, this._formDataAppend(files)).pipe(take(1));
  }


  //Helper of UPLOAD
  _formDataAppend(files: File[]): FormData {
    const formData: FormData = new FormData();
    if (files.length > -1) {
      files.forEach((item) => {
        formData.append('file', item, item.name);
      })
    }
    return formData;
  }






}
