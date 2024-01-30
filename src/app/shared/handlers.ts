import { HttpClient } from '@angular/common/http';
import { DOWNLOAD, SERVER_URL } from './constants';

export const handleVideoDownload = (
  http: HttpClient,
  body: { ytVideoUrl: string },
  videoTitle: string,
  extension: string
) => {
  http
    .post(`${SERVER_URL}/${DOWNLOAD}`, body, {
      responseType: 'arraybuffer',
    })
    .subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: `video/${extension}` });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${videoTitle}.${extension}`;
      link.click();
    });
};
