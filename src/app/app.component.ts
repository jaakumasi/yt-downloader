import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { ErrorComponent } from './error/error.component';
import { handleSrcInputChange } from './shared/handlers';
import { VideoComponent } from './video/video.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    VideoComponent,
    ErrorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  videoSrc = '/assets/video.mp4';
  showVideo = true;
  showError = false;

  http = inject(HttpClient);

  onSrcInputChange() {
    handleSrcInputChange(
      this.http,
      this.videoSrc,
      this.showVideo,
      this.showError
    );
  }
}
