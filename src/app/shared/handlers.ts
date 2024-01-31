import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOWNLOAD, SERVER_URL } from './constants';

// export const handleVideoDownload = (
//   http: HttpClient,
//   body: { ytVideoUrl: string },
//   videoTitle: string,
//   extension: string
// ) => {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//   });
//   http
//     .post(`${SERVER_URL}/${DOWNLOAD}`, body, {
//       responseType: 'arraybuffer',
//       headers,
//     })
//     .subscribe((data: ArrayBuffer) => {
//       const blob = new Blob([data], { type: `video/${extension}` });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${videoTitle}.${extension}`;
//       link.click();
//     });
// };

export const handleVideoDownload = (url: string, title: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = title;
  link.target = '_blank';
  link.click();
};
