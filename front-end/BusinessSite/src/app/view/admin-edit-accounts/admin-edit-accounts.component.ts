import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject  } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { RequestResult, Incident } from 'src/app/model/RequestResult';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/model/Account';

import { DialogEditAccountComponent } from 'src/app/component/dialog-edit-account/dialog-edit-account.component';
import { Paging } from 'src/app/model/PagingInfo';
import { MessageDescription, MessageType } from 'src/app/component/message/message.component';
import { StaticNames } from 'src/app/common/StaticNames';
import { AuthGuard } from 'src/app/guards/authGuard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-accounts',
  templateUrl: './admin-edit-accounts.component.html',
  styleUrls: ['./admin-edit-accounts.component.scss'],
})

export class AdminEditAccountsComponent implements OnInit, OnDestroy {

  private authGuard: AuthGuard;
  private router: Router;
  private service: DataService;

  public accounts$: BehaviorSubject<Array<Account>> = new BehaviorSubject<Array<Account>>(null);
  public message$: BehaviorSubject<MessageDescription> = new BehaviorSubject<MessageDescription>({ type: MessageType.Spinner });
  public paging$: BehaviorSubject<Paging<null>> = new BehaviorSubject<Paging<null>>(null);
  public columns: string[] = ['login', 'role'];
  public dialog: MatDialog;
  public staticNames: StaticNames = new StaticNames();

  public constructor(service: DataService, titleService: Title, dialog: MatDialog, authGuard: AuthGuard, router: Router)
  {
    this.service = service;
    this.dialog = dialog;
    this.authGuard = authGuard;
    this.router = router;

    titleService.setTitle(environment.siteName);
  }

  public async ngOnInit(): Promise<void>
  {
    await this.authGuard.checkIsLogged();
    if (this.authGuard.isLoggedIn$.value)
    {
      this.refreshAccounts(null);
      this.paging$.subscribe(value => this.refreshAccounts(value));
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void
  {
    this.paging$.unsubscribe();
  }

  private refreshPaging(): void
  {
    this.service.countAccount()
                .then
                (
                  win => this.hanlePaging(win, this.paging$),
                  fail => this.handleError(fail)
                );
  }

  private refreshAccounts(paging: Paging<null>): void
  {
    if (!paging)
    {
      this.refreshPaging();
      return;
    }

    this.service.getAccounts(paging.getCurrentPage() * environment.paging.maxUsers, environment.paging.maxUsers)
                .then
                (
                  result => this.handleAccounts(result),
                  reject =>  this.handleError(reject)
                );
  }

  public changePage(page: number): void
  {
    this.paging$.next(new Paging(page, environment.paging.maxUsers, this.paging$.value.getMaxItems()));
  }

  public skipPage(amount: number): void
  {
    this.changePage(this.paging$.value.getCurrentPage() + amount);
  }

  public showDialog(id?: number): void
  {
    const dialogRef = this.dialog.open
    (
      DialogEditAccountComponent, {width: '50%', data: id},
    );

    dialogRef.afterClosed()
             .toPromise()
             .then
             (
               // note: it is a full resresh
               () => this.refreshAccounts(this.paging$.value)
             );
  }

  private hanlePaging(result: RequestResult<number>, content: BehaviorSubject<Paging<null>>): void
  {
    if (result.isSucceed)
    {
      const currentPage = content?.value?.getCurrentPage() ?? 0;
      content.next(new Paging(currentPage, environment.paging.maxUsers, result.data));
    }
    else
    {
      this.handleIncident(result.error);
    }
  }

  private handleAccounts(result: RequestResult<Account[]>): void
  {
    this.message$.next(null);
    if (result.isSucceed)
    {
      this.accounts$.next(result.data);
    }
    else
    {
      this.handleIncident(result.error);
    }
  }

  private handleIncident(error: Incident): void
  {
    console.log(error);
    this.message$.next({text: error.detail, type: MessageType.Error });
  }

  private handleError(error: any): void
  {
    console.log(error);

    if (error.name !== undefined)
    {
      this.message$.next({text: error.name, type: MessageType.Error });
    }
    else
    {
      this.message$.next({text: error, type: MessageType.Error });
    }
  }
}
