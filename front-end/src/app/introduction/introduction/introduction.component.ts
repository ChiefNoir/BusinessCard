import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PublicService } from '../../core/services/public.service';
import { ResourcesService } from '../../core/services/resources.service';
import { Introduction } from '../../shared/models/introduction.model';
import { MessageDescription, MessageType } from '../../shared/components/message/message.component';
import { RequestResult } from '../../shared/models/request-result.interface';
import { Incident } from '../../shared/models/incident.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  public introduction$: BehaviorSubject<Introduction> = new BehaviorSubject<Introduction>(null);
  public message$: BehaviorSubject<MessageDescription> = new BehaviorSubject<MessageDescription>({ type: MessageType.Spinner });

  public constructor(
    private service: PublicService,
    public textMessages: ResourcesService,
    titleService: Title
  ) {
    titleService.setTitle(
      this.textMessages.TitlePageIntroduction + environment.siteName
    );
  }

  public ngOnInit(): void {
    this.service
        .getIntroduction()
        .subscribe(
          win => this.handleIntroduction(win),
          fail => this.handleError(fail));
  }

  private handleIntroduction(result: RequestResult<Introduction>): void {
    if (result.isSucceed) {
      this.introduction$.next(result.data);
      this.message$.next(null);
    } else {
      this.handleIncident(result.error);
    }
  }

  private handleIncident(error: Incident): void {
    this.message$.next({ text: error.message, type: MessageType.Error });
  }

  private handleError(error: any): void {
    if (error.name !== undefined) {
      this.message$.next({ text: error.name, type: MessageType.Error });
    } else {
      this.message$.next({ text: error, type: MessageType.Error });
    }
  }
}
