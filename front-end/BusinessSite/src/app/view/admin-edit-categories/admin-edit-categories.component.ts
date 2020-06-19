import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { RequestResult } from 'src/app/model/RequestResult';
import { Category } from 'src/app/model/Category';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditorCategoryComponent } from 'src/app/component/dialog-editor-category/dialog-editor-category.component';

@Component({
  selector: 'app-admin-edit-categories',
  templateUrl: './admin-edit-categories.component.html',
  styleUrls: ['./admin-edit-categories.component.scss'],
})

export class AdminEditCategoriesComponent implements AfterViewInit {
  private service: DataService;
  public categories$: BehaviorSubject<Array<Category>> = new BehaviorSubject<Array<Category>>(null);
  public dialog: MatDialog;

  public columns: string[] = ['code', 'displayName', 'isEverything'];

  public constructor(service: DataService, titleService: Title, dialog: MatDialog) {
    this.service = service;
    this.dialog = dialog;

    titleService.setTitle(environment.siteName);
  }

  ngAfterViewInit(): void {
    this.service.getCategories()
                .then
                (
                  (result) => this.handle(result, this.categories$),
                  (error) => this.handleError(error)
                );
  }

  public showRow(data: any): void {
    const dialogRef = this.dialog.open(DialogEditorCategoryComponent, {width: '50%'});

    dialogRef.componentInstance.code = data;

    dialogRef.afterClosed()
             .subscribe
             (
               (result) =>
               {
                }
            );
  }

  private handle<T>(result: RequestResult<T>, content: BehaviorSubject<T>): void {
    if (result.isSucceed) {
    content.next(result.data);
    } else{
      this.handleError(result.errorMessage);
    }
  }
  
  private handleError(error: any): void {
    // TODO: react properly
    console.log(error);
  }
}