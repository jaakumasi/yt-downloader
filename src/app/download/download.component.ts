import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { handleVideoDownload } from '../shared/handlers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
})
export class DownloadComponent implements AfterViewInit {
  http = inject(HttpClient);
  store = inject(Store);
  storeObs$ = this.store.select('initStateReducer');

  /* data [video title, format (qualityLabel (eg: 720p), container (eg: mp4), url)] */
  @Input() formatDetails!: any;

  ngAfterViewInit(): void {
    console.log(this.formatDetails);
  }

  onDownload() {
    this.storeObs$.subscribe((state) => {
      const { title, url } = state;
      console.log('state url: ', url);
      console.log('state title: ', title);

      const body = { ytVideoUrl: url };
      handleVideoDownload(this.http, body, title, this.formatDetails.container);
    });
  }
}
