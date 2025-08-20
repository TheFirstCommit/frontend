import React, { useState } from 'react';
import { makeFeedPdfBlob } from '@/components/makePdf';
import type { FeedItem } from '@/components/FeedPdf';
import { PdfSlideViewer } from '@/components/PdfViewer';
import { toDataUrl } from '@/utils/toDataUrl';

export default function FeedPage() {
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);

  const openViewer = async () => {
    // 이미지가 필요한 경우 data URL로 변환 (확장자/형식 추론 문제 회피)
    const imgDataUrl = await toDataUrl('/images/Zuto.png');
    const items: FeedItem[] = [
      {
        id: '1',
        title: '첫 게시물',
        body: '텍스트 본문입니다. 사진과 함께 PDF로 저장됩니다.',
        imageUrl: imgDataUrl,
        createdAt: '2025-08-16',
      },
      {
        id: '2',
        title: '둘째 게시물',
        body: '두 번째 피드. 이미지가 없을 수도 있어요.',
        createdAt: '2025-08-16',
      },
    ];

    const { url } = await makeFeedPdfBlob(items);
    setViewerUrl(url);
  };

  const closeViewer = () => {
    if (viewerUrl) URL.revokeObjectURL(viewerUrl);
    setViewerUrl(null);
  };

  return (
    <div className="p-4">
      <h1>피드 작성/미리보기</h1>
      <button onClick={openViewer} className="mt-2 px-4 py-2 rounded bg-blue-600 text-white">
        PDF로 보기 (슬라이드)
      </button>
      {viewerUrl && <PdfSlideViewer file={viewerUrl} onClose={closeViewer} />}
    </div>
  );
}