import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DownloadComponent } from '../download/download.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [CommonModule, DownloadComponent],
  templateUrl: './video-details.component.html',
  styleUrl: './video-details.component.scss',
})
export class VideoDetailsComponent implements AfterViewInit {
  @Input() videoInfo!: any;
  videosWithAudio!: any[];
  showDownloadOptions = false;

  ngAfterViewInit(): void {
    const formats = this.videoInfo.formats;

    this.videosWithAudio = formats
      .map((format: any) => {
        // check out formats that are either mp4 or webm and that have audio 🎼 attached
        if (
          (/video\/mp4/.test(format.mimeType) ||
            /video\/webm/.test(format.mimeType)) &&
          format.audioBitrate
        )
          return format;
      })
      // remove 'undefined' values
      .filter((value: any) => value !== undefined);

    this.showDownloadOptions = true;
  }
}
