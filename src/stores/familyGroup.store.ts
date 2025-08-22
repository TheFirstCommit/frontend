import { create } from 'zustand'

interface FamilyGroupStore {
  familyName: string
  paymentDay: string
  relation: string
  elder: {
    name: string
    birth: string // "yyyy-mm-dd" 형식의 문자열
    number: string
    address: string
    addressDetail: string
    addressNumber: string
  }
  elderImg: File | null
  errorMessage: {
    familyName: string | null
    elderName: string | null
    elderBirth: string | null
    elderNumber: string | null
    elderAddressDetail: string | null
    elderAddressNumber: string | null
    relation: string | null
    elderImg: string | null
  }
  setFamilyName: (familyName: string) => void
  setPaymentDay: (paymentDay: string) => void
  setRelation: (relation: string) => void
  setElder: (elder: {
    name: string
    birth: string
    number: string
    address: string
    addressDetail: string
    addressNumber: string
  }) => void
  setElderImg: (elderImg: File | null) => void
  setErrorMessage: (key: keyof FamilyGroupStore['errorMessage'], value: string | null) => void
  reset: () => void
}

export const useFamilyGroupStore = create<FamilyGroupStore>()(
  set => ({
    familyName: '',
    paymentDay: '',
    relation: '',
    elder: {
      name: '',
      birth: '',
      number: '',
      address: '',
      addressDetail: '',
      addressNumber: '',
    },
    elderImg: null,
    errorMessage: {
      familyName: null,
      elderName: null,
      elderBirth: null,
      elderNumber: null,
      elderAddressDetail: null,
      elderAddressNumber: null,
      relation: null,
      elderImg: null,
    },
    setFamilyName: (familyName: string) => set({ familyName }),
    setPaymentDay: (paymentDay: string) => set({ paymentDay }),
    setRelation: (relation: string) => set({ relation }),
    setElder: (elder: {
      name: string
      birth: string
      number: string
      address: string
      addressDetail: string
      addressNumber: string
    }) => set({ elder }),
    setElderImg: (elderImg: File | null) => set({ elderImg }),
    setErrorMessage: (key, value) => {
      set(state => ({
        errorMessage: { ...state.errorMessage, [key]: value },
      }))
    },
    reset: () => {
      set({
        familyName: '',
        paymentDay: '',
        relation: '',
        elder: {
          name: '',
          birth: '',
          number: '',
          address: '',
          addressDetail: '',
          addressNumber: '',
        },
        elderImg: null,
        errorMessage: {
          familyName: null,
          elderName: null,
          elderBirth: null,
          elderNumber: null,
          elderAddressDetail: null,
          elderAddressNumber: null,
          relation: null,
          elderImg: null,
        },
      })
    },
  }),
)