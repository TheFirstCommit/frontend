import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Props = {
    file: string | Blob | ArrayBuffer;
    onClose: () => void;
};

export const PdfSlideViewer: React.FC<Props> = ({ file, onClose }) => {
    const [numPages, setNumPages] = useState(0);

    const onLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
        <div className="p-3 flex justify-between items-center text-white">
            <div>PDF Viewer</div>
            <button onClick={onClose} className="px-3 py-1 rounded bg-white/20">닫기</button>
        </div>

        <div className="flex-1 min-h-0">
            <Document file={file} onLoadSuccess={onLoadSuccess} loading={<Loader />}>
            {numPages > 0 && (
                <Swiper style={{ height: '100%' }}>
                {Array.from({ length: numPages }, (_, i) => (
                    <SwiperSlide key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Page
                        pageNumber={i + 1}
                        width={Math.min(window.innerWidth, 900)}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={<Loader />}
                    />
                    </SwiperSlide>
                ))}
                </Swiper>
            )}
            </Document>
        </div>
        </div>
    );
};

const Loader = () => (
    <div className="w-full h-full flex items-center justify-center text-white/80">로딩 중…</div>
);