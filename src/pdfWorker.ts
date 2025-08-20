import { pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
// 디버그용
console.log('[pdfjs] workerSrc =', workerSrc);