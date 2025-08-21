import { create } from "zustand"

interface LeaderStore {
    isLeader: boolean
    setIsLeader: (isLeader: boolean) => void
    reset: () => void
}

export const useLeaderStore = create<LeaderStore>((set) => ({
    isLeader: true,
    setIsLeader: (isLeader) => set({ isLeader }),
    reset: () => set({ isLeader: false }),
}))