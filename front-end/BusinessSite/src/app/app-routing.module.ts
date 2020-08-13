import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionComponent } from './view/introduction/introduction.component';
import { ProjectsListComponent } from './view/projects-list/projects-list.component';
import { ProjectComponent } from './view/project/project.component';
import { NotFoundComponent } from './view/notfound/notfound.component';
import { AdminLoginComponent } from './view/admin-login/admin-login.component';
import { AdminEditProjectsComponent } from './view/admin-edit-projects/admin-edit-projects.component';
import { AdminEditCategoriesComponent } from './view/admin-edit-categories/admin-edit-categories.component';
import { AdminEditAccountsComponent } from './view/admin-edit-accounts/admin-edit-accounts.component';
import { AdminEditIntroductionComponent } from './view/admin-edit-introduction/admin-edit-introduction.component';
import { AuthGuard } from './guards/authGuard';
import { AdminComponent } from './view/admin/admin.component';

const routes: Routes = [
  { path: '', component: IntroductionComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectsListComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/editor/projects',  component: AdminEditProjectsComponent },
  { path: 'admin/editor/categories', component: AdminEditCategoriesComponent },
  { path: 'admin/editor/accounts', component: AdminEditAccountsComponent },
  { path: 'admin/editor/introduction', component: AdminEditIntroductionComponent },
  { path: 'project/:code', component: ProjectComponent },
  { path: 'projects/:category', component: ProjectsListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
