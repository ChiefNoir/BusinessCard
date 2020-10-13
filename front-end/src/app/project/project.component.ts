import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TextMessages } from 'src/app/shared/text-messages.resources';
import { PublicService } from 'src/app/core/public.service';
import { MessageType, MessageDescription } from 'src/app/shared/message/message.component';
import { Project } from 'src/app/shared/project.model';
import { RequestResult, Incident } from 'src/app/shared/request-result.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-list',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})

export class ProjectComponent
{
  private service: PublicService;
  private activeRoute: ActivatedRoute;
  private router: Router;
  private titleService: Title;

  public message$: BehaviorSubject<MessageDescription> = new BehaviorSubject<MessageDescription>({type: MessageType.Spinner });
  public project$: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  public textMessages: TextMessages = new TextMessages();

  public constructor(service: PublicService, activeRoute: ActivatedRoute, router: Router, titleService: Title)
  {
    this.service = service;
    this.activeRoute = activeRoute;
    this.router = router;
    this.titleService = titleService;

    this.activeRoute.params.subscribe
    (
      () => { this.refreshPage(); }
    );
  }

  private refreshPage(): void
  {
    this.project$.next(null);

    const code = this.activeRoute.snapshot.paramMap.get('code');
    this.service.getProject(code)
                .then
                (
                  win => this.handleProject(win),
                  fail => this.handleError(fail)
                );
  }

  private handleProject(result: RequestResult<Project>): void
  {
    if (result.isSucceed)
    {
      if (result.data == null)
      {
        this.router.navigate(['/404']);
      }

      this.titleService.setTitle(result.data?.displayName + this.textMessages.TitleSeparator + environment.siteName);
      this.project$.next(result.data);
    }
    else
    {
      this.handleIncident(result.error);
    }
  }

  private handleIncident(error: Incident): void
  {
    console.log(error);
    this.message$.next({text: error.message, type: MessageType.Error });
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