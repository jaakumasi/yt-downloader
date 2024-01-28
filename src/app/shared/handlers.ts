import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';

export const handleSrcInputChange = async (
  http: HttpClient,
  videoSrc: string,
  showVideo: boolean,
  showError: boolean
) => {
  const body = { ytVideoUrl: videoSrc };

  http
    .post('http://127.0.0.1:2024/download', body, {
      responseType: 'arraybuffer',
    })
    .subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'white trash - working.mp4';
      // link.click();
    });
};
