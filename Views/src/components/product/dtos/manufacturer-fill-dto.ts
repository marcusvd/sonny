import { CompanyDto } from "src/shared/dtos/company-dto";
import { ProductDto } from "./product-dto";

    export class ManufacturerFillDto
    {
       id:number;
       manufacturer:string;
       companyId:number;
       company:CompanyDto;
    }
