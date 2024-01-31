import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { handleVideoDownload } from '../shared/handlers';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent {
  http = inject(HttpClient);
  store = inject(Store);
  storeObs$ = this.store.select('initStateReducer');

  /* data [video title, format (qualityLabel (eg: 720p), container (eg: mp4), url)] */
  @Input() formatDetails!: any;

  onDownload() {
    this.storeObs$.subscribe((state) => {
      const { title } = state;
      const url = this.formatDetails.url;
      handleVideoDownload(url, title);
    });
  }
}
