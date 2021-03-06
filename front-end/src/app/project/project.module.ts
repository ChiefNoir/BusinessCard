import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectComponent } from './project/project.component';
import { RootComponent } from './root/root.component';

import { ProjectRoutingModule } from './project.routing.module';
import { ProjectFullComponent } from './project-full/project-full.component';

import { SharedModule } from '../shared/shared.module';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ],
  declarations: [
    RootComponent,
    ProjectComponent,
    ProjectFullComponent,
    CarouselComponent
  ],
})
export class ProjectModule {}
