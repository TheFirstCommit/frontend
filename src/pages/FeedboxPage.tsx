import React, { useMemo, useState } from "react";
import { PdfSlideViewer } from "@/components/PdfViewer";
import { saveBlob } from "@/utils/saveBlob";

// --- 유틸 (기존 RemotePdfPage 코드 재사용) ---
function parseFilenameFromDisposition(disposition?: string | null): string | null {
  if (!disposition) return null;
  const m = /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(disposition);
  return m ? decodeURIComponent(m[1].replace(/"/g, "")) : null;
}
function inferNameFromPath(path: string, fallback = "document.pdf") {
  const last = path.split("/").filter(Boolean).pop();
  return last || fallback;
}

// --- 데모 데이터 (임시) ---
type Newsletter = {
  id: number;
  title: string;            // e.g. "2025년 8월 소식지"
  pdfPath: string;          // 프록시 경유 경로
  status: "제작완료" | "배송중" | "배송완료";
};

const DEMO: Newsletter[] = [
  {
    id: 1,
    title: "2025년 8월 소식지",
    pdfPath: "/pdf-proxy/ipfs/QmUFesMAN5pJfnRFUdPrS9mkxf9ewAy3xDnm3yPk6Lr2Ry",
    status: "배송중",
  },
  {
    id: 2,
    title: "2025년 7월 소식지",
    pdfPath: "/pdf-proxy/ipfs/QmUFesMAN5pJfnRFUdPrS9mkxf9ewAy3xDnm3yPk6Lr2Ry",
    status: "제작완료",
  },
  {
    id: 3,
    title: "2025년 6월 소식지",
    pdfPath: "/pdf-proxy/ipfs/QmUFesMAN5pJfnRFUdPrS9mkxf9ewAy3xDnm3yPk6Lr2Ry",
    status: "배송완료",
  },
];

export default function FeedboxPage() {
  // 상태 필터
  const [tab, setTab] = useState<"제작완료" | "배송중" | "배송완료">("배송중");

  // 체크박스
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const selectAllVisible = (checked: boolean, visibleIds: number[]) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) visibleIds.forEach((id) => next.add(id));
      else visibleIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  // 리스트 필터링
  const items = useMemo(
    () => DEMO.filter((n) => n.status === tab),
    [tab]
  );
  const visibleIds = items.map((i) => i.id);
  const allVisibleChecked =
    items.length > 0 && visibleIds.every((id) => selected.has(id));

  // PDF 미리보기 상태
  const [viewer, setViewer] = useState<{
    url: string;  // objectURL
    blob: Blob;
    filename: string;
  } | null>(null);

  // (공통) 원격 PDF fetch → blob/objectURL 생성
  const fetchPdf = async (path: string) => {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error("PDF 다운로드 실패");

    const ct = res.headers.get("content-type") || "";
    if (!/application\/pdf/i.test(ct) && !/application\/octet-stream/i.test(ct)) {
      // 일부 서버는 octet-stream으로 내려줌
      throw new Error(`PDF가 아닌 응답: ${ct}`);
    }
    const hdrName = parseFilenameFromDisposition(
      res.headers.get("content-disposition")
    );
    const filename = hdrName ?? inferNameFromPath(path, "document.pdf");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return { blob, url, filename };
  };

  // 항목 클릭 → 미리보기
  const openPreview = async (item: Newsletter) => {
    try {
      const { blob, url, filename } = await fetchPdf(item.pdfPath);
      // 기존 viewer가 있으면 먼저 정리
      if (viewer?.url?.startsWith("blob:")) URL.revokeObjectURL(viewer.url);
      setViewer({ blob, url, filename });
    } catch (e: any) {
      alert(e?.message ?? "PDF를 열 수 없어요.");
    }
  };

  // 일괄 다운로드
  const downloadSelected = async () => {
    if (selected.size === 0) {
      alert("다운로드할 소식지를 선택해주세요.");
      return;
    }
    try {
      // 선택된 것 중 현재 탭에 보이는 항목만(원한다면 전체에서 찾아도 됨)
      const targets = DEMO.filter((n) => selected.has(n.id));
      for (const n of targets) {
        const { blob, filename } = await fetchPdf(n.pdfPath);
        saveBlob(blob, filename);
      }
    } catch (e: any) {
      alert(e?.message ?? "다운로드 중 오류가 발생했어요.");
    }
  };

  return (
    <div className="bg-emerald-50 min-h-screen">
      <main className="mx-auto max-w-screen-sm p-4 space-y-6">
        {/* 섹션: 상태 탭 */}
        <section>
          <h2 className="text-base font-semibold mb-3">이번 달 소식지 배송 현황</h2>
          <div className="inline-flex gap-2 bg-emerald-100/60 p-1 rounded-full">
            {(["제작완료", "배송중", "배송완료"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`h-9 px-3 rounded-full text-sm font-medium transition ${
                  tab === t
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* 섹션: 소식지 목록 + PDF 다운로드 */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold">소식지 목록</h3>
            <button
              onClick={downloadSelected}
              className="h-9 px-3 rounded-full border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50 text-sm"
            >
              PDF 다운로드하기
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            발행된 소식지를 한눈에 모아보고 필요 시 PDF로 저장하세요.
          </p>

          {/* 전체 선택 */}
          <label className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              className="w-5 h-5 accent-emerald-600"
              checked={allVisibleChecked}
              onChange={(e) => selectAllVisible(e.currentTarget.checked, visibleIds)}
            />
            <span className="text-sm text-gray-700">현재 목록 전체 선택</span>
          </label>

          {/* 리스트 */}
          <ul className="divide-y divide-emerald-100 rounded-xl overflow-hidden bg-white">
            {items.map((item) => (
              <li key={item.id} className="p-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-emerald-600"
                    checked={selected.has(item.id)}
                    onChange={() => toggle(item.id)}
                  />
                  <button
                    onClick={() => openPreview(item)}
                    className="flex-1 text-left py-2 text-[15px] text-gray-900 hover:underline"
                  >
                    {item.title}
                  </button>
                </div>
              </li>
            ))}
            {items.length === 0 && (
              <li className="p-6 text-center text-gray-500">표시할 소식지가 없어요.</li>
            )}
          </ul>
        </section>
      </main>

      {/* PDF 미리보기 모달 */}
      {viewer && (
        <PdfSlideViewer
          key={viewer.url}              // url 바뀌면 강제 리마운트
          file={viewer.url}
          title={viewer.filename}
          onClose={() => {
            if (viewer.url?.startsWith("blob:")) URL.revokeObjectURL(viewer.url);
            setViewer(null);
          }}
        />
      )}
    </div>
  );
}