import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
import { DialogQuizComponent } from 'src/shared/components/dialog-quiz/dialog-quiz.component';
import { AuthWarningsComponent } from '../warnings/auth-warnings.component';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends BackEndService<MyUser, number> {

  private currentUserSubject: BehaviorSubject<UserToken> = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem("myUser")));
  public currentUser: UserToken;


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

  register(user: MyUser) {
    return this.add$<MyUser>(user, 'register').pipe(take(1))
      .subscribe({
        next: (user: MyUser) => {
          //console.log(user)
          this._communicationsAlerts.communication('', 6, 2, 'top', 'center');
          //  this._router.navigateByUrl('/login');
        }, error: (err: any) => {
          console.log(err)
          this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        }
      })
  }

  login(user: MyUser) {
    return this.add$<MyUser>(user, 'login').subscribe({
      next: (user: MyUser) => {

        this.currentUserSubject.next(user);
        this.currentUser = user;

        console.log(this.currentUserSubject)

        if (user.authenticated) {

          if (user.action == "TwoFactor") {

            this._router.navigateByUrl('two-factor');

          }

          this.setItemLocalStorage(user);

          this._router.navigateByUrl('side-nav');

          this._communicationsAlerts.communication('', 4, 2, 'top', 'center');
        }
        else {
          console.log('Usuário não autenticado');
        }

      }, error: (err: any) => {
        console.log(err.error.Message)

        const dialogRef = this._dialog.open(AuthWarningsComponent, {
          // scrollStrategy: this._overlay.scrollStrategies.noop(),
          width: '250px',
          height: 'auto',
          disableClose: true,
          data: {
            title: 'Erro de autenticação',
            messageBody: err.error.Message,
            btn1: 'Fechar',
            btn2: 'Reenviar Link',
            authentication: true
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('the dialog was closed');
          // this.animal = result;
        })
        // this._communicationsAlerts.communicationCustomized({
        //   'message': err.error.Message,
        //   'action': null,
        //   'delay':null,
        //   'positionVertical': 'center',
        //   'positionHorizontal': 'top',
        // });
      }
    })

  }

  openDialogLogin(): void {
    const dialogRef = this._dialog.open(LoginComponent, {
      width: '250px',

      data: {}
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
        //this._toastr.success('Recuperação de senha.', 'Solicitação enviada...');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Usuário não encontrado.', 'Falha');
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
        //this._toastr.success('Recuperação de senha.', 'Com Sucesso!!!');
      }, error: (err: any) => {
        console.log(err)
        //this._toastr.error('Tente novamente mais tarde, obrigado!', 'Falha');
      }
    })
  }
}
