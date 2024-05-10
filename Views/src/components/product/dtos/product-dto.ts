import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";
import { QuantityDto } from "./quantity-dto";
import { TrackingDto } from "./tracking-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { EquipamentDto } from "./equipament-dto";

export class ProductDto {
  id: number;
  companyid: number;
  company: CompanyDto;
  equipament: EquipamentDto;
  quantities: QuantityDto[]
  trackings: TrackingDto[];
  }
