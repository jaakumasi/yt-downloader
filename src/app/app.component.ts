import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DownloadComponent } from './download/download.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';
import { GET_INFO, SERVER_URL, VERIFY_URL } from './shared/constants';
import { handleVideoDownload } from './shared/handlers';
import { VideoDetailsComponent } from './video-details/video-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingComponent,
    VideoDetailsComponent,
    DownloadComponent,
    ErrorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  videoSrc = '';
  showVideoDetails = false;
  showDownload = false;
  showLoading = false;
  showError = false;
  videoInfo: any = {};

  http = inject(HttpClient);

  onSrcInputChange() {
    if (!this.videoSrc) {
      this.showError = false;
      return;
    }

    this.showVideoDetails = false;
    this.showError = false;
    this.showLoading = true;

    const body = { ytVideoUrl: this.videoSrc };
    this.http
      .post(`${SERVER_URL}/${VERIFY_URL}`, body)
      .subscribe((response: any) => {
        if (!response.isValid) {
          this.showDownload = false;
          this.showLoading = false;
          this.showError = true;
        } else {
          this.showLoading = true;
          this.http
            .post(`${SERVER_URL}/${GET_INFO}`, body)
            .subscribe((info: any) => {
              this.videoInfo = {
                videoDetails: info.videoDetails,
                formats: info.formats,
              };

              this.showVideoDetails = true;
              this.showDownload = false;
              this.showLoading = false;
            });
        }
      });
  }

  onDownload() {
    const body = { ytVideoUrl: this.videoSrc };
    handleVideoDownload(this.http, body);
  }
}
