import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/shared/services/back-end/backend.service';
import { CommunicationAlerts } from 'src/shared/services/messages/snack-bar.service';
import { ConfirmEmail } from '../dto/confirm-email';
import { ForgotPassword } from '../dto/forgot-password';
import { MyUser } from '../dto/myUser';
import { ResetPassword } from '../dto/reset-password';
import { RetryConfirmPassword } from '../dto/retry-confirm-password';
import { T2Factor } from '../dto/t2-factor';
import { UserToken } from '../dto/user-token';
import { MatDialog } from '@angular/material/dialog';
import { AuthWarningsComponent } from '../warnings/auth-warnings.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RetryConfirmEmailComponent } from '../retry-confirm-email/retry-confirm-email.component';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends BackEndService<MyUser, number> {

  private currentUserSubject: BehaviorSubject<UserToken> = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem("myUser")));
  public currentUser: UserToken;
  public _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    override _http: HttpClient,
    private _router: Router,
    private _dialog: MatDialog,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.auth)
    this.currentUserSubject?.next(JSON.parse(localStorage.getItem("myUser")))
    this.currentUser = this.currentUserSubject?.value
  }

  get CompanyId() {
    return this.currentUser.companyId;
  }

  register(user: MyUser, form: FormGroup) {
    this.add$<MyUser>(user, 'register').pipe(take(1))
      .subscribe({
        next: (user: MyUser) => {
          this._dialog.closeAll();
          this._communicationsAlerts.communication('', 6, 5, 'top', 'center');
          // this._communicationsAlerts.communicationCustomized({
          //   'message': erroCode[1],
          //   'action': '',
          //   'style': 'red-snackBar-error',
          //   'delay': '3',
          //   'positionVertical': 'center',
          //   'positionHorizontal': 'top',
          // });
          this.openAuthWarnings({
            btn1: 'Fechar', btn2: '', title: 'AVISO:',
            messageBody: "Verifique seu e-mail para confirmar seu registro.Obrigado!",
            next: true, action: 'openLogin'
          })
        }, error: (err: any) => {
          console.log(err)
          const erroCode: string = err.error.Message.split('|');
          switch (erroCode[0]) {
            case '1.1': {
              this._communicationsAlerts.communicationCustomized({
                'message': erroCode[1],
                'action': '',
                'delay': '3',
                'style': 'red-snackBar-error',
                'positionVertical': 'center',
                'positionHorizontal': 'top',
              });
              this._errorMessage.next(erroCode[1])
              form.controls['email'].setErrors({ errorEmailDuplicated: true })
              break;
            }
            case '1.2': {
              this._communicationsAlerts.communicationCustomized({
                'message': erroCode[1],
                'action': '',
                'delay': '3',
                'style': 'red-snackBar-error',
                'positionVertical': 'center',
                'positionHorizontal': 'top',
              });
              this._errorMessage.next(erroCode[1])
              form.controls['userName'].setErrors({ errorUserNameDuplicated: true })
              break;
            }
            case '200.0': {
              this._communicationsAlerts.communicationCustomized({
                'message': erroCode[1],
                'action': '',
                'style': 'red-snackBar-error',
                'delay': '3',
                'positionVertical': 'center',
                'positionHorizontal': 'top',
              });
              this.openAuthWarnings({ btn1: 'Fechar', btn2: '', title: 'Erro de autenticação', messageBody: erroCode[1] })
              break;
            }
            case '1.7': {
              this._communicationsAlerts.communicationCustomized({
                'message': erroCode[1],
                'action': '',
                'style': 'red-snackBar-error',
                'delay': '3',
                'positionVertical': 'center',
                'positionHorizontal': 'top',
              });
              this._dialog.closeAll();
              this.openAuthWarnings({ btn1: 'Fechar', btn2: '', title: 'Erro de autenticação', messageBody: erroCode[1] })
              break;
            }
          }
        }
      })
    return this._errorMessage
  }
  openDialogRegistering(): void {
    const dialogRef = this._dialog.open(RegisterComponent, {
      width: 'auto',
      height: 'auto',
      data: { error: this._errorMessage },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    })
  }
  login(user: MyUser) {

    this.add$<MyUser>(user, 'login').subscribe({
      next: (user: MyUser) => {
        console.log(user)

        this.currentUserSubject.next(user);
        this.currentUser = user;

        if (user.authenticated) {
          // this._errorMessage.complete();
          // this._errorMessage.next(null);
          if (user.action == "TwoFactor") {

            this._router.navigateByUrl('two-factor');

          }

          this.setItemLocalStorage(user);
          this.setItemLocalStorageCompanyId(user.companyId);

          this._router.navigateByUrl('side-nav');

          this._communicationsAlerts.communication('', 4, 2, 'top', 'center');

          this._dialog.closeAll();
        }
        else {
          console.log('Usuário não autenticado');
        }

      }, error: (err: any) => {
        console.log(err)
        const erroCode: string = err.error.Message.split('|');
        switch (erroCode[0]) {
          case '1.4': {
            this._communicationsAlerts.communicationCustomized({
              'message': erroCode[1],
              'action': '',
              'delay': '3',
              'style': 'red-snackBar-error',
              'positionVertical': 'center',
              'positionHorizontal': 'top',
            });
            this._errorMessage.next(erroCode[1])
            break;
          }
          case '1.11': {
            this._communicationsAlerts.communicationCustomized({
              'message': erroCode[1],
              'action': '',
              'style': 'red-snackBar-error',
              'delay': '3',
              'positionVertical': 'center',
              'positionHorizontal': 'top',
            });
            this.openAuthWarnings({ btn1: 'Fechar', btn2: '', title: 'Erro de autenticação', messageBody: erroCode[1] })
            break;
          }
          case '1.6': {
            this._communicationsAlerts.communicationCustomized({
              'message': erroCode[1],
              'action': '',
              'style': 'red-snackBar-error',
              'delay': '3',
              'positionVertical': 'center',
              'positionHorizontal': 'top',
            });
            this._errorMessage.next(erroCode[1])
            break;
          }
        }

      }

    })
    return this._errorMessage;
  }
  openDialogLogin(): void {
    // this._errorMessage = new BehaviorSubject<string>(null);
    const dialogRef = this._dialog.open(LoginComponent, {
      width: '350px',
      // height: '490px',
      // minHeight: '490px',
      // maxHeight: '490px',
      height: 'auto',
      data: { error: this._errorMessage },
      autoFocus: true,
      // scrollStrategy: this.scrollStrategy
    });

    dialogRef.afterClosed().subscribe(result => {
      this._errorMessage.next('');
    })
  }
  openAuthWarnings(data: any) {
    const btn1: string = data.btn1;
    const btn2: string = data.btn2;
    const title: string = data.title;
    const messageBody: string = data.messageBody;
    const next: boolean = data.next;
    const action: string = data.action;
    const dialogRef = this._dialog.open(AuthWarningsComponent, {
      width: '250px',
      height: 'auto',
      disableClose: true,
      data: {
        title: title,
        messageBody: messageBody,
        btn1: btn1,
        btn2: btn2,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (next) {
        if (action === 'openLogin') {
          this._dialog.closeAll();
          setTimeout(() => {
            this.openDialogLogin()
          }, 3000);
        }
      }
    })


  }
  openDialogForgot(): void {
    const dialogRef = this._dialog.open(ForgotPasswordComponent, {
      width: 'auto',
      height: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('the dialog was closed');

    })
  }
  resendEmailConfim() {
    const dialogRef = this._dialog.open(RetryConfirmEmailComponent, {
      width: '450px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    })
  }
  public get isAuthenticated(): boolean {

    // if (this.currentUserSubject) {
    //   this.logOut();
    //   return false;
    // }

    // if (new Date().getTime() > (new Date(this.currentUserSubject?.value?.expiration).getTime())) {
    //   this.logOut();
    //   return false;
    // }

    // if (this.currentUserSubject?.value?.authenticated) {
    //   return true;

    // }
    // else {
    //   return false
    // }
    return false;
  }
  setItemLocalStorage(user: MyUser) {
    localStorage.setItem("myUser", JSON.stringify(user));
  }
  setItemLocalStorageCompanyId(companyId: number) {
    localStorage.setItem("companyId", JSON.stringify(companyId));
  }
  logOut() {
    this._router.navigateByUrl('/first')
    // this.openDialogLogin();
    localStorage.clear();
    this._communicationsAlerts.communication('', 5, 2, 'top', 'center');
    this.currentUserSubject.complete();
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }
  forgotMyPassword(forgotPassword: ForgotPassword) {
    return this.add$<ForgotPassword>(forgotPassword, 'forgotpassword').pipe(take(1)).subscribe({
      next: () => {
        this._communicationsAlerts.communicationCustomized({
          'message': '',
          'action': '7',
          'style': 'green-snackBar',
          'delay': '3',
          'positionVertical': 'center',
          'positionHorizontal': 'top',
        });
        this._dialog.closeAll();
      }, error: (err: any) => {
        this._communicationsAlerts.communicationCustomized({
          'message': '',
          'action': '7',
          'style': 'green-snackBar',
          'delay': '3',
          'positionVertical': 'center',
          'positionHorizontal': 'top',
        });
        this._dialog.closeAll();
      }
    })
  }
  twoFactor(t2factor: T2Factor) {

    return this.add$<T2Factor>(t2factor, 'twoFactor').pipe(take(1)).subscribe({
      next: () => {
        //this._toastr.success('Autenticação de dois fatores.', 'Sucesso!');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Token Inválido ou expirado.', 'Falha');
      }
    })



  }
  confirmEmail(confirmEmail: ConfirmEmail) {
    return this.add$<ConfirmEmail>(confirmEmail, 'confirmEmailAddress').pipe(take(1)).subscribe({
      next: () => {
        //this._toastr.success('Recuperação de senha.', 'Solicitação enviada...');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Usuário não encontrado.', 'Falha');
      }
    })

  }
  retryConfirmEmailGenerateNewToken(retryConfirmPassword: RetryConfirmPassword) {
    return this.add$<RetryConfirmPassword>(retryConfirmPassword, 'RetryConfirmEmailGenerateNewToken').pipe(take(1)).subscribe({
      next: () => {
        this._dialog.closeAll();
        setTimeout(() => {
          this.openDialogLogin()
        }, 3000);
        //this._toastr.success('Confirmação de email...', 'Solicitação enviada...');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Usuário não encontrado.', 'Falha');
      }
    })
  }
  reset(resetPassword: ResetPassword) {
    return this.add$(resetPassword, 'reset').pipe(take(1)).subscribe({
      next: () => {
        this._communicationsAlerts.communicationCustomized({
          'message': '',
          'action': '6',
          'style': 'green-snackBar',
          'delay': '3',
          'positionVertical': 'center',
          'positionHorizontal': 'top',
        });
        this._router.navigate((['/']));
        this.openDialogLogin();
      }, error: (err: any) => {
        console.log(err)
        const erroCode: string = err.error.Message.split('|');
        switch (erroCode[0]) {
          case '1.12': {
            this._communicationsAlerts.communicationCustomized({
              'message': erroCode[1],
              'action': '',
              'style': 'red-snackBar-error',
              'delay': '',
              'positionVertical': 'center',
              'positionHorizontal': 'top',
            });
            // this.openAuthWarnings({ btn1: 'Fechar', btn2: '', messageBody: erroCode[1] })
            break;
          }

        }
      }
    })
  }
}
