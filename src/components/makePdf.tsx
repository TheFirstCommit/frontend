import { pdf } from '@react-pdf/renderer';
import React from 'react';
import { FeedPdf } from './FeedPdf';
import type { FeedItem } from './FeedPdf';

export async function makeFeedPdfBlob(items: FeedItem[]) {
  const instance = pdf(<FeedPdf items={items} />);
  const blob = await instance.toBlob();
  const url = URL.createObjectURL(blob);
  return { blob, url };
}