import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DownloadComponent } from './download/download.component';
import { LoadingComponent } from './loading/loading.component';
import {
  GET_INFO,
  INVALID_URL,
  SEARCH_INSTRUCTIONS,
  SERVER_URL,
  VERIFY_URL,
} from './shared/constants';
import { handleVideoDownload } from './shared/handlers';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { MessageComponent } from './message/message.component';
import { Store } from '@ngrx/store';
import { changeTitle, changeUrl } from './store/store.actions';

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
    MessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showVideoDetails = false;
  showLoading = false;
  showMessage = true;

  videoSrc = '';
  videoInfo: any = {};
  message = SEARCH_INSTRUCTIONS;

  http = inject(HttpClient);
  store = inject(Store);

  onSrcInputChange() {
    // do nothing if search input is empty
    if (!this.videoSrc) {
      this.showMessage = false;
      return;
    }

    this.showVideoDetails = false;
    this.showMessage = false;
    this.showLoading = true;

    // first, check if the URL is valid. Proceed to get info if its is
    const body = { ytVideoUrl: this.videoSrc };
    this.http
      .post(`${SERVER_URL}/${VERIFY_URL}`, body)
      .subscribe((response: any) => {
        // if URL is invalid...
        if (!response.isValid) {
          this.showLoading = false;
          this.message = INVALID_URL;
          this.showMessage = true;
        } else {
          // get video info
          this.showLoading = true;
          this.http
            .post(`${SERVER_URL}/${GET_INFO}`, body)
            .subscribe((info: any) => {
              this.videoInfo = {
                videoDetails: info.videoDetails,
                formats: info.formats,
              };

              console.log('app, video src: ', this.videoSrc);

              // update the store
              this.store.dispatch(
                changeTitle({ title: info.videoDetails.title })
              );
              this.store.dispatch(changeUrl({ url: this.videoSrc }));
              // @ts-ignore

              this.showVideoDetails = true;
              this.showLoading = false;
            });
        }
      });
  }
}
