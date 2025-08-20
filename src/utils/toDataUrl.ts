export async function toDataUrl(path: string): Promise<string> {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`이미지 불러오기 실패: ${path}`);

    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
        if (typeof reader.result === "string") {
            resolve(reader.result); // ✅ data:image/png;base64,... 형태
        } else {
            reject(new Error("이미지를 DataURL로 변환 실패"));
        }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}