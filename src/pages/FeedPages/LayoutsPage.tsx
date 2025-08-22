import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATIC_IMAGES: string[] = [
  "/images/layout1.png",
  "/images/layout2.png",
  "/images/layout3.png",
  "/images/layout4.png",
  "/images/layout5.png",
  "/images/layout6.png",
  "/images/layout7.png",
  "/images/layout8.png",
];

type Layout = {
  id: string;
  name: string;
  thumb: string; // 썸네일 이미지 경로 추가
};

const LAYOUTS: Layout[] = [
  { id: "one-portrait", name: "세로 1장", thumb: "public/images/layout1.png" },
  { id: "one-landscape", name: "가로 1장", thumb: "public/images/layout2.png" },

  { id: "two-h", name: "가로 2장", thumb: "public/images/layout3.png" },
  { id: "two-v", name: "세로 2장", thumb: "public/images/layout4.png" },

  // 위 1행: 1칸+1칸, 아래 2행: 큰 1칸(두 행 차지)
  { id: "2plus1", name: "2+1 레이아웃", thumb: "public/images/layout5.png" },

  // 위 2행: 큰 1칸(두 행 차지), 아래 1행: 1칸+1칸
  { id: "1plus2", name: "1+2 레이아웃", thumb: "public/images/layout6.png" },

  // 위 1행: 1칸+1칸, 아래 가운데 1칸
  { id: "2top1bottom", name: "2상단1하단", thumb: "public/images/layout7.png" },

  { id: "two-by-two", name: "2x2 그리드", thumb: "public/images/layout8.png" }
];

function LayoutCard({
  layout,
  thumbSrc,
  selected,
  onClick,
}: {
  layout: Layout;
  thumbSrc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-2 text-left transition ${
        selected ? "border-emerald-500 ring-2 ring-emerald-300" : "border-gray-200 hover:border-gray-300"
      }`}
      aria-pressed={selected}
    >
      <div className="text-sm text-gray-700 mb-2">{layout.name}</div>

      <div className="relative w-full aspect-[9/16] rounded-lg bg-gray-50 border border-gray-200 p-2">
        <img src={thumbSrc} alt={layout.name} className="w-full h-full object-contain" loading="lazy" />
      </div>
    </button>
  );
}

export default function LayoutsPage() {
  const [selectedId, setSelectedId] = useState<string>(LAYOUTS[0].id);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-emerald-50/80 backdrop-blur border-b border-emerald-100">
        <div className="max-w-screen-sm mx-auto p-4">
          <h1 className="text-lg font-semibold">소식 작성하기</h1>
          <p className="text-sm text-gray-600">
            소식지에 인쇄할 레이아웃을 선택하세요. 사진이 많을수록 소식지가 더 알차게 완성돼요.
          </p>
        </div>
      </header>

      {/* 레이아웃 선택 그리드 */}
      <main className="max-w-screen-sm mx-auto p-4 grid grid-cols-2 gap-3">
        {LAYOUTS.map((l) => (
          <LayoutCard
            key={l.id}
            layout={l}
            thumbSrc={l.thumb}
            selected={l.id === selectedId}
            onClick={() => setSelectedId(l.id)}
          />
        ))}
      </main>

      <div className="sticky bottom-0 bg-emerald-50/80 backdrop-blur border-t border-emerald-100">
        <div className="max-w-screen-sm mx-auto p-4">
          <button
            type="button"
            onClick={() => {
              if (!selectedId) return;
              navigate("/compose", { state: { layoutId: selectedId }})
            }}
            disabled={!selectedId}
            className="w-full h-12 rounded-xl font-medium transition
                       disabled:opacity-40 disabled:cursor-not-allowed
                       bg-emerald-600 text-white hover:bg-emerald-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}