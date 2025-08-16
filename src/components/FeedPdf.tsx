// src/components/FeedPdf.tsx
import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

// 한글 폰트 등록 (앱에서 한 번만 실행되면 됨)
Font.register({
    family: 'NotoSansKR',
    fonts: [
        { src: '/fonts/NotoSansKR-Regular.ttf', fontWeight: 'normal' },
        { src: '/fonts/NotoSansKR-Bold.ttf', fontWeight: 'bold' },
    ],
});
export type ImageSource = string | { data: ArrayBuffer; format: 'png' | 'jpg' | 'jpeg' };

export type FeedItem = {
    id: string;
    title?: string;
    body?: string;
    imageUrl?: string;
    createdAt?: string;
};

const styles = StyleSheet.create({
    page: { padding: 24, fontSize: 12, fontFamily: 'NotoSansKR' },
    title: { fontSize: 18, marginBottom: 8 },
    date: { fontSize: 10, color: '#666', marginBottom: 12 },
    image: { width: '100%', height: 320, marginBottom: 12 }, // objectFit은 제거(react-pdf 스타일 제약)
    body: { lineHeight: 1.5 },
    divider: { marginTop: 16, borderTopWidth: 1, borderTopColor: '#ddd' },
});

export function FeedPdf({ items }: { items: FeedItem[] }) {
    return (
        <Document>
        {items.map((it, idx) => (
            <Page key={it.id} size="A4" style={styles.page} wrap>
            {it.title && <Text style={styles.title}>{it.title}</Text>}
            {it.createdAt && <Text style={styles.date}>{it.createdAt}</Text>}
            {it.imageUrl && (
                // 타입 정의가 Node Buffer까지 포함되어 엄격해서 경고가 나올 수 있어 as any 사용
                <Image src={it.imageUrl as any} style={{
                    maxWidth: 400,       // 원하는 최대 가로
                    maxHeight: 300,      // 원하는 최대 세로
                    objectFit: 'contain' // 비율 유지
                }} />
            )}
            {it.body && <Text style={styles.body}>{it.body}</Text>}
            {idx < items.length - 1 && <View style={styles.divider} />}
            </Page>
        ))}
        </Document>
    );
}