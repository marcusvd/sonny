import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDto } from '../dtos/product-dto';
import { ex_haveSpace } from '../list-product/helpers/field-handle-help';
import { TruncatePipe } from 'src/shared/pipes/truncate.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule


  ],
  providers: [TruncatePipe],
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.scss']
})
export class DetailedProductComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<DetailedProductComponent>, @Inject(MAT_DIALOG_DATA) public product: ProductDto,
    private _truncatePipe: TruncatePipe,
  ) { }


  clickedYes(id: number, yes: string) {
    this._dialogRef.close({ id: id });
  }
  clickedNo(no: string) {
    this._dialogRef.close(no);
  }
  
  productTemplate:any

  objectHandle = (product: ProductDto, _truncatePipe: TruncatePipe) => {
    return Object.assign(product, {
      productType: product.productType,
      segment: product.segment,
      manufacturer: product.manufacturer,
      model: product.model,
      quantity: product.quantity,
      specificities: product.specificities,
      description: ex_haveSpace(product.specificities.description) ? product.specificities.description : _truncatePipe.transform(product.specificities.description, 10),
      detailedDescription: ex_haveSpace(product.specificities.detailedDescription) ? product.specificities.detailedDescription : _truncatePipe.transform(product.specificities.detailedDescription, 10),
      supplier: product.supplier,
      usedHistoricalOrSupplier: product.usedHistoricalOrSupplier,
      purchaseInvoiceNumber: product.purchaseInvoiceNumber,
      costPrice: product.costPrice,
      soldPrice: product.soldPrice,
      entryDate: product.entryDate,
      soldDate: product.soldDate,
      warrantyEnd: product.warrantyEnd,
      warrantyEndLocal: product.warrantyEndLocal,
      isUsed: product.isUsed,
      isTested: product.isTested,
    })
    // ex_haveSpace(x.productType?.key) ? x?.productType?.key : _truncatePipe.transform(x?.productType?.key, 10)
  }

  rows: number = 0;
  calcRows(value: string) {
    return this.rows = value.length / 80;   
  }

  ngOnInit(): void {
    this.productTemplate = this.objectHandle(this.product, this._truncatePipe)
    console.log(this.product);
  }

}
