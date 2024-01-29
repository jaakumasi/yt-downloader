import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [],
  templateUrl: './video-details.component.html',
  styleUrl: './video-details.component.scss',
})
export class VideoDetailsComponent implements AfterViewInit {
  @Input() videoInfo!: any;

  ngAfterViewInit(): void {
    //@ts-ignore
    const formats = this.videoInfo.formats;
    // console.log(formats);

    const videosWithAudio = formats
      .map((format: any) => {
        // check out formats that are either mp4 or webm and that have audio 🎼 attached
        if (
          (/video\/mp4/.test(format.mimeType) ||
            /video\/webm/.test(format.mimeType)) &&
          format.audioBitrate
        )
          return format;
      })
      // removed 'undefined' values
      .filter((value: any) => value !== undefined);
    console.log(videosWithAudio);
  }
}
