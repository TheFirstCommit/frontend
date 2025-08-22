import React, { useEffect, useState } from "react";
import { apiClient } from "@/shared/api/client";

type HomeApiResponse = {
  message: string;
  data: { family: { familyName: string; memberCount: number } };
};

type InviteApiResponse = { message: string; data: { code: string } };

const MAX_MEMBERS = 20; // 정책 값(서버에서 내려주면 그 값 사용)

function randomCode(len = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function InviteCodePage() {
  const [familyName, setFamilyName] = useState("우리 가족");
  const [memberCount, setMemberCount] = useState(0);
  const [code, setCode] = useState<string>("--------");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const remaining = Math.max(0, MAX_MEMBERS - memberCount);

  // 가족 정보 + 초대코드 발급
  const fetchData = async () => {
    setLoading(true);
    try {
      const [homeRes, inviteRes] = await Promise.all([
        apiClient.get<HomeApiResponse>("/api/family/home"),
        apiClient.get<InviteApiResponse>("/api/family/invite"), // ✅ 초대코드 발급
      ]);
      setFamilyName(homeRes.data.data.family.familyName);
      setMemberCount(homeRes.data.data.family.memberCount);
      setCode(inviteRes.data.data.code || randomCode());
    } catch (e) {
      console.error(e);
      // 임시 fallback 코드
      setCode(randomCode());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const reissue = async () => {
    try {
      const res = await apiClient.get<InviteApiResponse>("/api/family/invite"); // 다시 호출하면 새 코드 발급(백엔드 정책에 따름)
      setCode(res.data.data.code || randomCode());
    } catch (e) {
      console.error(e);
      alert("코드를 다시 가져오지 못했어요.");
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <main className="mx-auto max-w-screen-sm px-5 py-10 text-center">
        <h1 className="text-base font-semibold mb-8">초대코드</h1>

        <p className="text-gray-800 text-lg font-medium">{familyName} 식구들~^^</p>

        <div className="mt-8 text-gray-700">
          <p>가족 그룹 멤버는 최대 {MAX_MEMBERS}명까지 가능해요!</p>
          <p className="mt-1">
            초대 가능 인원:{" "}
            <span className="font-semibold">{String(remaining).padStart(2, "0")}명</span>
          </p>
        </div>

        <div className="mt-10 inline-flex items-center gap-3">
          <span className="tracking-widest text-3xl font-extrabold text-gray-900">
            {loading ? "로딩중…" : code}
          </span>
          <button
            onClick={copy}
            disabled={loading}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50"
            aria-label="초대코드 복사"
            title="복사"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="10" height="10" rx="2"></rect>
              <path d="M5 15V7a2 2 0 0 1 2-2h8"></path>
            </svg>
          </button>
        </div>

        {copied && (
          <div className="mt-4 inline-block rounded-full bg-emerald-600 text-white text-sm px-3 py-1">
            초대코드를 복사했어요!
          </div>
        )}

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={reissue}
            disabled={loading}
            className="h-11 px-5 rounded-xl border bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            코드 새로 발급
          </button>
          <button
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({ title: "가족 초대코드", text: `초대코드: ${code}` });
                } catch { /* 취소 */ }
              } else {
                copy();
              }
            }}
            className="h-11 px-5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            메시지로 공유하기
          </button>
        </div>
      </main>
    </div>
  );
}