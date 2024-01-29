import { HttpClient } from '@angular/common/http';
import { DOWNLOAD, SERVER_URL } from './constants';

export const handleVideoDownload = (http: HttpClient, body: {}) => {
  http
    .post(`${SERVER_URL}/${DOWNLOAD}`, body, {
      responseType: 'arraybuffer',
    })
    .subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'new.mp4';
      link.click();
    });
};
