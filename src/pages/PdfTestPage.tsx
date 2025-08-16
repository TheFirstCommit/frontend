import React, { useState } from 'react';
import { makeFeedPdfBlob } from '@/components/makePdf';
import type { FeedItem } from '@/components/FeedPdf';
import { PdfSlideViewer } from '@/components/PdfViewer';
import { normalizeImageToDataUrl } from '@/utils/normalizeImageToDataUrl';

export default function PdfTestPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const openPdf = async () => {
    try {
      const imgDataUrl = await normalizeImageToDataUrl('/images/Zuto.png', 'image/jpeg');

      const items: FeedItem[] = [
        { id: '1', title: '첫', body: '본문', imageUrl: imgDataUrl, createdAt: '2025-08-16' },
        { id: '2', title: '둘', body: '텍스트만', createdAt: '2025-08-16' },
      ];

      const { url } = await makeFeedPdfBlob(items);
      setPdfUrl(url);
    } catch (e) {
      console.error(e);
      alert('이미지 또는 PDF 생성 중 오류');
    }
  };

  const closePdf = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
  };

  return (
    <>
      <button onClick={openPdf}>PDF 생성 후 뷰어 열기</button>
      {pdfUrl && <PdfSlideViewer file={pdfUrl} onClose={closePdf} />}
    </>
  );
}