import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAccountsComponent } from './admin-accounts/admin-accounts.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminIntroductionComponent } from './admin-introduction/admin-introduction.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';
import { AdminInformationComponent } from './admin-information/admin-information.component';
import { AdminComponent } from './admin/admin.component';

import { AdminRoutingModule } from './admin.routing.module';

import { NavigationComponent } from './shared/navigation/navigation.component';
import { DialogEditProjectComponent } from './dialog-edit-project/dialog-edit-project.component';
import { DialogEditorCategoryComponent } from './dialog-editor-category/dialog-editor-category.component';
import { DialogEditAccountComponent } from './dialog-edit-account/dialog-edit-account.component';
import { FileUploaderComponent } from './shared/file-uploader/file-uploader.component';

import { PrivateService } from './private.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [
    NavigationComponent,

    AdminComponent,
    AdminAccountsComponent,
    AdminCategoriesComponent,
    AdminIntroductionComponent,
    AdminProjectsComponent,
    AdminInformationComponent,
    FileUploaderComponent,
    DialogEditProjectComponent,
    DialogEditorCategoryComponent,
    DialogEditAccountComponent,
  ],
  providers: [
    PrivateService
  ]
})
export class AdminModule {}
