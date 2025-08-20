export function saveBlob(blob: Blob, filename = 'document.pdf') {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url); // 다운로드용 임시 URL
}