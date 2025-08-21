import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PreviewModal from "@/components/PreviewModal";
import { apiClient } from "@/shared/api/client";

/** 레이아웃 메타: 썸네일 + 슬롯 개수(사진 최대 개수) */
type LayoutMeta = {
  id: string;
  name: string;
  thumb: string;     // /images/... (public 폴더 기준 절대경로)
  slotCount: number; // 이 숫자만큼 사진 선택 허용
  code: number;
};

const LAYOUTS: LayoutMeta[] = [
  { id: "one-portrait",  name: "1장(세로)",            thumb: "/images/layout1.png", slotCount: 1, code: 1 },
  { id: "one-landscape", name: "1장(가로)",            thumb: "/images/layout2.png", slotCount: 1, code: 2 },
  { id: "two-h",         name: "1×2 (가로 두 장)",     thumb: "/images/layout3.png", slotCount: 2, code: 3 },
  { id: "two-v",         name: "2×1 (세로 두 장)",     thumb: "/images/layout4.png", slotCount: 2, code: 4 },
  { id: "2plus1",        name: "2 + 1",                thumb: "/images/layout5.png", slotCount: 3, code: 5 },
  { id: "1plus2",        name: "1 + 2",                thumb: "/images/layout6.png", slotCount: 3, code: 6 },
  { id: "2top1bottom",   name: "2 위 + 1 아래",        thumb: "/images/layout7.png", slotCount: 3, code: 7 },
  { id: "two-by-two",    name: "2×2",                  thumb: "/images/layout8.png", slotCount: 4, code: 8 },
];

export default function ComposePhotosPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { layoutId?: string } };

  const selectedLayout = useMemo(() => {
    const id = state?.layoutId;
    return LAYOUTS.find(l => l.id === id) ?? LAYOUTS[0];
  }, [state?.layoutId]);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [story, setStory] = useState("");
  const maxStoryLen = 100;

  const [isPreviewOpen, setPreviewOpen] = useState(false);

  // 업로드
  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("사진을 최소 1장 이상 선택해주세요.");
      return;
    }
    try {
      const form = new FormData();
      form.append("text", story);
      form.append("layout", String(selectedLayout.code));
      files.forEach((f) => form.append("imageFiles", f)); 

      await apiClient.post("/api/feeds", form);

      setPreviewOpen(false);
      // navigate('/preview', { state: { layoutId: selectedLayout.id } });
      alert("등록 완료!");
    } catch (e) {
      console.error(e);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // 미리보기 URL 관리
  useEffect(() => {
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(u => URL.revokeObjectURL(u));
  }, [files]);

  const openPicker = () => fileInputRef.current?.click();

  const onPickFiles: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    const max = selectedLayout.slotCount;
    const next = [...files, ...picked].slice(0, max); // 최대 slotCount까지
    setFiles(next);

    e.currentTarget.value = ""; // 같은 input 재선택 트리거
  };

  const removeAt = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const remaining = selectedLayout.slotCount - files.length;

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-emerald-50/80 backdrop-blur border-b border-emerald-100">
        <div className="max-w-screen-sm mx-auto p-4">
          <h1 className="text-lg font-semibold">소식 작성하기</h1>
        </div>
      </header>

      <main className="max-w-screen-sm mx-auto p-4 space-y-4">
        {/* 레이아웃 미니 프리뷰 + 안내 */}
        <div className="flex items-start gap-4">
          <div className="w-20">
            <div className="w-full aspect-[3/4] rounded-md border bg-white p-1">
              <img
                src={selectedLayout.thumb}
                alt={selectedLayout.name}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 mb-2">
              선택한 레이아웃에 맞는 사진을 선택해주세요.
            </p>

            <button
              type="button"
              onClick={openPicker}
              className="px-4 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-medium hover:bg-emerald-200"
            >
              사진 불러오기
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onPickFiles}
              className="hidden"
            />
            <p className="mt-2 text-xs text-gray-500">
              사진 순서는 레이아웃 적용 시 그대로 반영돼요!
            </p>
          </div>
        </div>

        {/* 썸네일 슬롯 */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: selectedLayout.slotCount }).map((_, i) => {
            const src = previews[i];
            return (
              <div
                key={i}
                className="relative w-full aspect-square rounded-md border bg-gray-100 overflow-hidden"
              >
                {src ? (
                  <>
                    <img src={src} alt={`선택사진-${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeAt(i)}
                      className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded"
                    >
                      삭제
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    {i + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500">
          선택됨 {files.length} / {selectedLayout.slotCount}
          {remaining > 0 && <span> · {remaining}장 더 선택 가능</span>}
        </p>

        {/* 스토리 입력 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">사진과 함께 전할 이야기를 입력하세요. (선택)</label>
          <div className="relative">
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value.slice(0, maxStoryLen))}
              rows={5}
              className="w-full rounded-xl border bg-emerald-100/60 p-3 outline-none"
              placeholder="오늘은..."
              maxLength={maxStoryLen}
            />
            <span className="absolute bottom-2 right-3 text-xs text-gray-500">
              {story.length}/{maxStoryLen}
            </span>
          </div>
        </div>
      </main>

      {/* 하단 버튼: 모달 열기 */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-emerald-50/80 backdrop-blur border-t border-emerald-100">
        <div className="max-w-screen-sm mx-auto p-4">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="w-full h-12 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-40"
            disabled={files.length === 0}
          >
            다음
          </button>
        </div>
      </div>

      {/* 미리보기 모달: 등록에서 handleSubmit 실행 */}
      <PreviewModal
        open={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        onConfirm={handleSubmit}
        layoutId={selectedLayout.id}
        previews={previews}
        // avatarUrl="/images/avatar.png"
      />
    </div>
  );
}