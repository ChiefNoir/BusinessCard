import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PublicService } from 'src/app/core/public.service';
import { TextMessages } from 'src/app/shared/text-messages.resources';
import { RequestResult, Incident } from 'src/app/shared/request-result.model';
import { Category } from 'src/app/shared/category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDescription, MessageType } from 'src/app/shared/message/message.component';
import { PrivateService } from 'src/app/core/private.service';

@Component({
  selector: 'app-dialog-editor-category.component',
  templateUrl: './dialog-editor-category.component.html',
  styleUrls: ['./dialog-editor-category.component.scss']
})

export class DialogEditorCategoryComponent implements OnInit
{
  private categoryId: number;
  private service: PrivateService;
  private publicService: PublicService;
  private dialog: MatDialogRef<DialogEditorCategoryComponent>;

  public category$: BehaviorSubject<Category> = new BehaviorSubject<Category>(null);
  public disableInput$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public message$: BehaviorSubject<MessageDescription> = new BehaviorSubject<MessageDescription>(null);
  public title$: BehaviorSubject<string> = new BehaviorSubject<string>('Category properties');
  public textMessages: TextMessages = new TextMessages();

  public systemCategoryMessage: MessageDescription = {text: this.textMessages.CategorySystemWarning, type: MessageType.Info };

  constructor(service: PrivateService, publicService: PublicService, dialogRef: MatDialogRef<DialogEditorCategoryComponent>, @Inject(MAT_DIALOG_DATA) categoryId: number)
  {
    this.service = service;
    this.dialog = dialogRef;
    this.publicService = publicService;
    this.categoryId = categoryId;
  }

  public ngOnInit(): void
  {
    if (this.categoryId)
    {
      this.publicService.getCategory(this.categoryId)
                  .then
                  (
                    succeeded => this.handleCategory(succeeded, {text: this.textMessages.LoadComplete, type: MessageType.Info }),
                    rejected => this.handleError(rejected.message)
                  );
    }
    else
    {
      this.disableInput$.next(false);
      this.category$.next(new Category());
    }
  }


  public save(): void
  {
    this.disableInput$.next(true);
    this.message$.next({text: this.textMessages.SaveInProgress, type: MessageType.Spinner  });

    this.service.saveCategory(this.category$.value)
                .then
                (
                  succeeded =>
                  {
                    this.message$.next({text: this.textMessages.SaveInProgress, type: MessageType.Info });
                    this.handleCategory(succeeded, {text: this.textMessages.SaveComplete, type: MessageType.Info });
                  },
                  rejected => this.handleError(rejected.message)
                );
  }

  public delete(): void
  {
    this.message$.next({text: this.textMessages.DeleteInProgress, type: MessageType.Spinner  });
    this.disableInput$.next(true);

    this.service.deleteCategory(this.category$.value)
                .then
                (
                  win => this.handleDelete(win),
                  fail => this.handleError(fail)
                );
  }

  public close(): void
  {
    this.dialog.close();
  }

  private handleDelete(result: RequestResult<boolean>): void
  {
    if (result.isSucceed)
    {
      this.category$.next(null);
      this.message$.next({text: this.textMessages.DeleteComplete, type: MessageType.Info });
    }
    else
    {
      this.handleIncident(result.error);
    }
  }

  private handleCategory(result: RequestResult<Category>, description: MessageDescription): void
  {
    this.disableInput$.next(false);

    if (result.isSucceed)
    {
      this.category$.next(result.data);
      this.title$.next('Edit "' + result.data.code + '" category');
      this.message$.next(description);
    }
    else
    {
      this.handleIncident(result.error);
    }
  }

  private handleIncident(error: Incident): void
  {
    console.log(error);

    this.disableInput$.next(false);
    this.message$.next({text: error.message, type: MessageType.Error });
  }

  private handleError(error: any): void
  {
    console.log(error);

    this.disableInput$.next(false);

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