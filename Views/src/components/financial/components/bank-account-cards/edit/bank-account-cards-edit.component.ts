import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BankAccountCardsEditService } from 'src/components/financial/components/bank-account-cards/edit/services/bank-account-edit-cards.service';
import { BtnUpdateGComponent } from 'src/shared/components/btn-update-g/btn-update-g.component';
import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankAccountComponent } from '../../common-components/bank-account/bank-account.component';
import { BankCardsComponent } from '../../common-components/bank-cards/bank-cards.component';
import { BankAccountDto } from '../dto/bank-account-dto';
import { CardDto } from '../dto/card-dto';
import { PixDto } from '../dto/pix-dto';


@Component({
  selector: 'bank-account-cards-edit',
  templateUrl: './bank-account-cards-edit.component.html',
  styleUrls: ['./bank-account-cards-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    BankAccountComponent,
    BankCardsComponent,
    TitleComponent,
    SubTitleComponent,
    BtnUpdateGComponent,
    PixComponent
  ],
  providers: [BankAccountCardsEditService]
})
export class BankAccountCardsEditComponent extends BaseForm implements OnInit {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'row';
  cards: CardDto[];
  pixes: PixDto[];

  constructor(
    private _bankAccounteditService: BankAccountCardsEditService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _actRouter: ActivatedRoute,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  get getDate(): Date {
    return new Date();
  }

  formLoad(entity: BankAccountDto) {
    return this.formMain = this._fb.group({
      id: [entity.id || 0, [Validators.required]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      holder: [entity.holder, [Validators.required, Validators.maxLength(100)]],
      institution: [entity.institution, [Validators.required, Validators.maxLength(100)]],
      agency: [entity.agency, [Validators.required, Validators.maxLength(20)]],
      managerName: [entity.managerName, [Validators.maxLength(50)]],
      managerContact: [entity.managerContact, [Validators.maxLength(100)]],
      account: [entity.account, [Validators.required, Validators.maxLength(100)]],
      type: [entity.type, [Validators.required]],
      balance: [entity.balance, [Validators.required]],
      description: [entity.description, [Validators.maxLength(100)]],
      pixes: this._fb.array([]),
      cards: this._fb.array([]),
    })
  }

  update() {
    //console.log(this.formMain)
    if (this.alertSave(this.formMain)) {
      this._bankAccounteditService.update(this.formMain);
    }
  }

  getEntityId(id: number) {
    const bankaccount: Observable<BankAccountDto> = this._bankAccounteditService.loadById$('GetFnBankAccountByIdAllIncluded', id.toString());

    this.cards = [];
    this.pixes = [];

    bankaccount.subscribe(x => {
      this.formLoad(x);
      this.cards = x.cards;
      this.pixes = x.pixes;
    });

  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);
    this.screen();
  }

}
