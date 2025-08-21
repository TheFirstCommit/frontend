import { create } from "zustand"

interface MyInfoStore {
    InfoData: {
        name: string
        birthday: string
        phone: string
        relation: string
        provider: string
        imgUrl?: string
    }
    setInfoData: (data: {
        name: string
        birthday: string
        phone: string
        relation: string
        provider: string
        imgUrl?: string
    }) => void
    setImgUrl: (imgUrl: string) => void
}

export const useMyInfoStore = create<MyInfoStore>((set) => ({
    InfoData: {
        name: '',
        birthday: '',
        phone: '',
        relation: '',
        provider: '',
        imgUrl: '',
    },
    setInfoData: (data) => set(() => ({ InfoData: data })),
    setImgUrl: (imgUrl) => set((state) => ({ InfoData: { ...state.InfoData, imgUrl } })),
}))