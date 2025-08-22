

type Slot = { colSpan: number; rowSpan: number };
type LayoutPreviewDef = Record<string, { slots: Slot[] }>;

/** 모달 전용 레이아웃 슬롯 정의 (2cols x 3rows 기준) */
const LAYOUT_PREVIEW: LayoutPreviewDef = {
  "one-portrait": { slots: [{ colSpan: 1, rowSpan: 2 }] },
  "one-landscape": { slots: [{ colSpan: 2, rowSpan: 1 }] },

  "two-h": { slots: [{ colSpan: 1, rowSpan: 1 }, { colSpan: 1, rowSpan: 1 }] },
  "two-v": { slots: [{ colSpan: 2, rowSpan: 1 }, { colSpan: 2, rowSpan: 1 }] },

  "2plus1": {
    slots: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 2, rowSpan: 2 },
    ],
  },
  "1plus2": {
    slots: [
      { colSpan: 2, rowSpan: 2 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
  },
  "2top1bottom": {
    slots: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 }, // 하단 가운데 느낌은 실제 캔버스에서 조정 가능
    ],
  },
  "two-by-two": {
    slots: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
  },
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  layoutId: string;
  /** 이미지 미리보기 URL 목록 (선택 순서대로) */
  previews: string[];
  /** 선택(등록)자 아바타가 있으면 전달 */
  avatarUrl?: string;
};

export default function PreviewModal({
  open,
  onClose,
  onConfirm,
  layoutId,
  previews,
  avatarUrl,
}: Props) {
  if (!open) return null;

  const def = LAYOUT_PREVIEW[layoutId] ?? LAYOUT_PREVIEW["two-by-two"];
  const slots = def.slots;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Dim */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal card */}
      <div className="relative z-[71] w-[340px] max-w-[88vw] rounded-2xl bg-white p-4 shadow-xl">
        <h3 className="text-center text-base font-semibold mb-3">
          소식지 미리보기
        </h3>

        {/* 아바타 (오른쪽 위 띄우기) */}
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="avatar"
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full ring-4 ring-white shadow-md object-cover"
          />
        )}

        {/* 기기 프레임 느낌 */}
        <div className="rounded-2xl border bg-white p-3">
          {/* 상단 바 더미 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>

          {/* 레이아웃 그리드 */}
          <div className="relative w-full aspect-[3/4] rounded-xl bg-gray-50 border border-gray-200 p-2">
            <div className="grid grid-cols-2 grid-rows-3 gap-2 w-full h-full">
              {slots.map((s, i) => {
                const src = previews[i];
                return (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-md border bg-white"
                    style={{
                      gridColumn: `span ${s.colSpan} / span ${s.colSpan}`,
                      gridRow: `span ${s.rowSpan} / span ${s.rowSpan}`,
                    }}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={`slot-${i + 1}`}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-2xl font-semibold">
                        {i + 1}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 rounded-full border font-medium"
          >
            수정
          </button>
          <button
            type="button"
            onClick={async () => {
              await onConfirm();
            }}
            className="h-11 px-6 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}