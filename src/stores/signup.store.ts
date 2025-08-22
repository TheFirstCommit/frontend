import { create } from 'zustand'

interface SignUpStore {
  checked: {
    all: boolean
    terms: boolean
    privacy: boolean
    thirdParty: boolean
    profile: boolean
    marketing: boolean
  }
  setChecked: (key: keyof Omit<SignUpStore['checked'], 'all'>, checked: boolean) => void
  setCheckedAll: (checked: boolean) => void
  updateAllChecked: () => void
}

export const useSignUpCheckStore = create<SignUpStore>()(
  set => ({
    checked: {
      all: false,
      terms: false,
      privacy: false,
      thirdParty: false,
      profile: false,
      marketing: false,
    },
    setChecked: (key, checked) => {
      set(state => {
        const newChecked = { ...state.checked, [key]: checked }

        // 개별 체크박스가 변경되면 전체 동의 상태도 업데이트
        const allChecked =
          newChecked.terms &&
          newChecked.privacy &&
          newChecked.thirdParty &&
          newChecked.profile &&
          newChecked.marketing

        return { checked: { ...newChecked, all: allChecked } }
      })
    },
    setCheckedAll: checked => {
      set({
        checked: {
          all: checked,
          terms: checked,
          privacy: checked,
          thirdParty: checked,
          profile: checked,
          marketing: checked,
        },
      })
    },
    updateAllChecked: () => {
      set(state => {
        const allChecked =
          state.checked.terms &&
          state.checked.privacy &&
          state.checked.thirdParty &&
          state.checked.profile &&
          state.checked.marketing

        return { checked: { ...state.checked, all: allChecked } }
      })
    },
  }),
)

interface SignUpInfoStore {
  info: {
    profile: File | null
    name: string | null
    birth: string // "yyyy-mm-dd" 형식의 문자열
    phone: string
  }
  setInfo: (key: keyof SignUpInfoStore['info'], value: string | null | File | null) => void
  errorMessage: {
    name: string | null
    birth: string | null
    phone: string | null
  }
  setErrorMessage: (key: keyof SignUpInfoStore['errorMessage'], value: string) => void
}

export const useSignUpInfoStore = create<SignUpInfoStore>()(
  set => ({
    info: {
      profile: null,
      name: null,
      birth: '', // 빈 문자열로 초기화
      phone: '',
    },
    setInfo: (key, value) => {
      set(state => ({
        info: { ...state.info, [key]: value },
      }))
    },
    errorMessage: {
      name: null,
      birth: null,
      phone: null,
    },
    setErrorMessage: (key, value) => {
      set(state => ({
        errorMessage: { ...state.errorMessage, [key]: value },
      }))
    },
  }),
)
