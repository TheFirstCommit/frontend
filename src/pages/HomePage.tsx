import { useEffect, useState } from "react";
import { apiClient } from "@/shared/api/client";

type ImageRef = { cid: string; id: number };
type HomeDTO = {
    payment: { hasCard: boolean; paymentDay: string };
    family: { familyName: string; memberCount: number };
    feed: Array<{
        id: number;
        imgs: ImageRef[];
        text: string | null;
        createAt: string;
        author: { id: number; name: string; relation: string; img?: ImageRef | null };
        isAuthor: boolean;
    }>;
};
type HomeApiResponse = { message: string; data: HomeDTO };

const buildFileUrl = (img?: ImageRef | null) => {
    if (!img) return undefined;
    const base = apiClient.defaults.baseURL?.replace(/\/+$/, "") ?? "";
    return `${base}/api/files/${img.cid}/${img.id}`;
};

const formatTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "방금 전";
    if (m < 60) return `${m}분 전`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}시간 전`;
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const HH = String(d.getHours()).padStart(2, "0");
    const MM = String(d.getMinutes()).padStart(2, "0");
    return `${d.getFullYear()}.${mm}.${dd} ${HH}:${MM}`;
};

function FeedCard({
    authorName,
    authorRole,
    time,
    text,
    imageUrls,
}: {
    authorName: string;
    authorRole: string;
    time: string;
    text?: string | null;
    imageUrls: (string | undefined)[];
}) {
    const first = imageUrls[0];
    const remain = imageUrls.filter(Boolean).length - 1;

    return (
        <article className="bg-white">
        <div className="px-4 pt-4">
            <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200" aria-hidden />
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                {authorName} / {authorRole}
                </p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
            </div>
        </div>

        <div className="mt-3 relative">
            {first ? (
            <>
                <img
                src={first}
                alt=""
                className="w-full aspect-[16/10] object-cover bg-gray-100"
                />
                {remain > 0 && (
                <span className="absolute bottom-2 right-2 rounded-full bg-black/60 text-white text-xs px-2 py-1">
                    +{remain}
                </span>
                )}
            </>
            ) : (
            <div className="w-full aspect-[16/10] bg-gray-100" />
            )}
        </div>

        {!!text?.trim() && (
            <div className="px-4 py-3">
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
            </div>
        )}
        </article>
    );
}

export default function HomePage() {
    const [data, setData] = useState<HomeDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ctrl = new AbortController();
        (async () => {
        try {
            const res = await apiClient.get<HomeApiResponse>("/api/family/home", { signal: ctrl.signal });
            setData(res.data.data);
        } catch (e: any) {
            if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;
            console.error(e);
            setError("홈 데이터를 불러오지 못했어요.");
        } finally {
            setLoading(false);
        }
        })();
        return () => ctrl.abort();
    }, []);

    const familyName = data?.family.familyName ?? "우리 가족";
    const memberCount = data?.family.memberCount ?? 0;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
        {/* 헤더 */}
        <header className="sticky top-0 z-10">
            <div className="bg-gradient-to-b from-emerald-600 to-emerald-500 text-white">
            <div className="mx-auto max-w-screen-sm px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">
                <div className="w-6 h-6" />
                <h1 className="text-base font-semibold truncate">{familyName}</h1>
                <div className="w-6 h-6" />
                </div>
                <p className="mt-1 text-xs text-emerald-100">
                멤버 {memberCount}명
                {data?.payment?.hasCard === false && (
                    <span className="ml-2 opacity-80">(결제수단 미등록)</span>
                )}
                </p>
            </div>
            </div>
        </header>

        {/* 본문 */}
        {loading ? (
            <main className="mx-auto max-w-screen-sm p-4 space-y-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                <div className="h-4 w-40 bg-gray-200 rounded mb-3" />
                <div className="w-full aspect-[16/10] bg-gray-200 rounded" />
                </div>
            ))}
            </main>
        ) : error ? (
            <main className="mx-auto max-w-screen-sm p-6 text-center text-red-600">
            {error}
            </main>
        ) : (
            <main className="mx-auto max-w-screen-sm">
            {data?.feed?.length ? (
                <div className="divide-y">
                {data.feed.map((f) => (
                    <FeedCard
                    key={f.id}
                    authorName={f.author.name}
                    authorRole={f.author.relation}
                    time={formatTime(f.createAt)}
                    text={f.text}
                    imageUrls={(f.imgs ?? []).map(buildFileUrl)}
                    />
                ))}
                </div>
            ) : (
                <div className="p-6 text-center text-gray-500">표시할 피드가 없습니다.</div>
            )}
            </main>
        )}
        </div>
    );
}