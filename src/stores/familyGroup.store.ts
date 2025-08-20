import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FamilyGroupStore {
    familyName: string
    paymentDay: string
    relation: string
    elder: {
        name: string
        birth: {
            year: number
            month: number
            day: number
        }
        number: string
        address: string
        addressDetail: string
        addressNumber: string
    }
    elederImg: File | null
    errorMessage: {
        familyName: string | null
        elderName: string | null
        elderBirth: string | null
        elderNumber: string | null
        elderAddressDetail: string | null
        elderAddressNumber: string | null
        relation: string | null
    }
    setFamilyName: (familyName: string) => void
    setPaymentDay: (paymentDay: string) => void
    setRelation: (relation: string) => void
    setElder: (elder: {
        name: string
        birth: {
            year: number
            month: number
            day: number
        }
        number: string
        address: string
        addressDetail: string
        addressNumber: string
    }) => void
    setElderImg: (elederImg: File | null) => void
    setErrorMessage: (key: keyof FamilyGroupStore['errorMessage'], value: string | null) => void
    reset: () => void
}

export const useFamilyGroupStore = create<FamilyGroupStore>()(
    persist(
        (set, get) => ({
            familyName: '',
            paymentDay: '',
            relation: '',
            elder: {
                name: '',
                birth: {
                    year: 0,
                    month: 0,
                    day: 0,
                },
                number: '',
                address: '',
                addressDetail: '',
                addressNumber: '',
            },
            elederImg: null,
            errorMessage: {
                familyName: null,
                elderName: null,
                elderBirth: null,
                elderNumber: null,
                elderAddressDetail: null,
                elderAddressNumber: null,
                relation: null,
            },
            setFamilyName: (familyName: string) => set({ familyName }),
            setPaymentDay: (paymentDay: string) => set({ paymentDay }),
            setRelation: (relation: string) => set({ relation }),
            setElder: (elder: {
                name: string
                birth: {
                    year: number
                    month: number
                    day: number
                }
                number: string
                address: string
                addressDetail: string
                addressNumber: string
            }) => set({ elder }),
            setElderImg: (elederImg: File | null) => set({ elederImg }),
            setErrorMessage: (key, value) => {
                set((state) => ({
                    errorMessage: { ...state.errorMessage, [key]: value }
                }))
            },
            reset: () => {
                set({
                    familyName: '',
                    paymentDay: '',
                    relation: '',
                    elder: {
                        name: '',
                        birth: {
                            year: 0,
                            month: 0,
                            day: 0,
                        },
                        number: '',
                        address: '',
                        addressDetail: '',
                        addressNumber: '',
                    },
                    elederImg: null,
                    errorMessage: {
                        familyName: null,
                        elderName: null,
                        elderBirth: null,
                        elderNumber: null,
                        elderAddressDetail: null,
                        elderAddressNumber: null,
                        relation: null,
                    },
                })
            }
        }),
        { name: 'family-group-store' },
    ),
)