import { create } from "zustand"

interface PaymentDayStore {
    paymentDayStore: string
    setPaymentDayStore: (paymentDay: string) => void
}

export const usePaymentDayStore = create<PaymentDayStore>((set) => ({
    paymentDayStore: '',
    setPaymentDayStore: (paymentDay) => set({ paymentDayStore: paymentDay }),
}))