import React, { useState } from 'react';
import { PdfSlideViewer } from '@/components/PdfViewer';
import { saveBlob } from '@/utils/saveBlob';

function parseFilenameFromDisposition(disposition?: string | null): string | null {
    if (!disposition) return null;
    const m = /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(disposition);
    return m ? decodeURIComponent(m[1].replace(/"/g, '')) : null;
}

function inferNameFromPath(path: string, fallback = 'document.pdf') {
    const last = path.split('/').filter(Boolean).pop();
    return last || fallback;
}

export default function RemotePdfPage() {
    const [url, setUrl] = useState<string | null>(null);
    const [blob, setBlob] = useState<Blob | null>(null);
    const [fileName, setFileName] = useState<string>('document.pdf');

    const openRemotePdf = async () => {
        // 🔒 프록시 경유: /pdf-proxy/...
        const path = '/pdf-proxy/ipfs/QmUFesMAN5pJfnRFUdPrS9mkxf9ewAy3xDnm3yPk6Lr2Ry';
        const res = await fetch(path, { cache: 'no-store' });
        if (!res.ok) throw new Error('PDF 다운로드 실패');

        const ct = res.headers.get('content-type') || '';
        if (!/application\/pdf/i.test(ct) && !/application\/octet-stream/i.test(ct)) {
            throw new Error(`PDF가 아닌 응답: ${ct}`);
        }

        const hdrName = parseFilenameFromDisposition(res.headers.get('content-disposition'));
        setFileName(hdrName ?? inferNameFromPath(path, 'document.pdf'));
        
        const b = await res.blob();
        setBlob(b);
        const objUrl = URL.createObjectURL(b);
        setUrl(objUrl);
    };

    const download = () => {
        if (!blob) return;
        saveBlob(blob, fileName);
    };

    const close = () => {
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url); // blob만 revoke
        setUrl(null);
    };

    return (
        <div className="p-4">
        <button onClick={openRemotePdf} className="px-3 py-2 rounded bg-blue-600 text-white">
            원격 PDF 열기
        </button>
        <button
            onClick={download}
            disabled={!blob}
            className="px-3 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
            title={blob ? fileName : '먼저 PDF를 여세요'}
        >다운로드
        </button>
        {url && <PdfSlideViewer key={url} file={url} title={fileName} onClose={close} />} 
        {/* key=url → url 변경 시 컴포넌트 강제 재마운트 */}
        </div>
    );
}