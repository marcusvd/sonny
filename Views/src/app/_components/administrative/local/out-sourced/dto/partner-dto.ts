import { AddressDto } from "src/app/_shared/dtos/address-dto";
import { ContactDto } from "src/app/_shared/dtos/contact-dto";
import { InventoryDto } from "../../providers/Inventory/dto/inventory-dto";
import { CollectDeliverDto } from "../collect-deliver-list-table-all/dto/collect-deliver-dto";


export class PartnerDto {
   id:number;
   name:string;
   today:Date;
   cnpj:string;
   responsible:string;
   comments:string;
   businessline:string;
   transporter:boolean;
   supplier:boolean;
   address:AddressDto;
   addressid:number;
   contact:ContactDto;
   contactid:number;
   inventories:InventoryDto[];
   transportercollectdelivers:CollectDeliverDto[];
   sourcecollectdelivers:CollectDeliverDto[];
   destinycollectdelivers:CollectDeliverDto[];



}
