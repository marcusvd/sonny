import { CommonModule } from "@angular/common"
import { ReactiveFormsModule } from "@angular/forms"


import { MatCardModule } from "@angular/material/card"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"
import { BtnGComponent } from "src/shared/components/btn-g/btn-g.component"
import { SubTitleComponent } from "src/shared/components/sub-title/sub-title.component"
import { TitleComponent } from "src/shared/components/title/components/title.component"
import { EditChecksComponent } from "../edit-checks/edit-checks.component"
import { ProductSelectComponent } from "../../../common-components/fields-select/product/product-select.component"

export const ImportsEditProductType: any[] = [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    EditChecksComponent,
    ProductSelectComponent
]
