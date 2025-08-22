import { create } from 'zustand'

interface FamilyMember {
  name: string
  relation: string
  imgUrl: string | null
}

interface FamilyStore {
  elder: {
    name: string
    birth: string
    number: string
    address: string
    addressDetail: string
    addressNumber: string
    imgUrl: string | null
  }
  member: {
    leader: FamilyMember
    members: FamilyMember[]
  }
  setElder: (elder: {
    name: string
    birth: string
    number: string
    address: string
    addressDetail: string
    addressNumber: string
    imgUrl?: string | null
  }) => void
  setElderImgUrl: (imgUrl: string | null) => void
  setLeader: (leader: FamilyMember) => void
  setLeaderImgUrl: (imgUrl: string | null) => void
  setMembers: (members: FamilyMember[]) => void
  addMember: (member: FamilyMember) => void
  updateMember: (index: number, member: FamilyMember) => void
  removeMember: (index: number) => void
  updateMemberImgUrl: (index: number, imgUrl: string | null) => void
  reset: () => void
}

export const useFamilyStore = create<FamilyStore>()(
  set => ({
    elder: {
      name: '',
      birth: '',
      number: '',
      address: '',
      addressDetail: '',
      addressNumber: '',
      imgUrl: null,
    },
    member: {
      leader: {
        name: '',
        relation: '',
        imgUrl: null,
      },
      members: [],
    },
    setElder: (elder) => set((state) => ({
      elder: {
        ...state.elder,
        ...elder,
        imgUrl: elder.imgUrl !== undefined ? elder.imgUrl : state.elder.imgUrl
      }
    })),
    setElderImgUrl: (imgUrl) => set((state) => ({
      elder: { ...state.elder, imgUrl }
    })),
    setLeader: (leader) => set((state) => ({
      member: { ...state.member, leader }
    })),
    setLeaderImgUrl: (imgUrl) => set((state) => ({
      member: {
        ...state.member,
        leader: { ...state.member.leader, imgUrl }
      }
    })),
    setMembers: (members) => set((state) => ({
      member: { ...state.member, members }
    })),
    addMember: (member) => set((state) => ({
      member: {
        ...state.member,
        members: [...state.member.members, member]
      }
    })),
    updateMember: (index, member) => set((state) => ({
      member: {
        ...state.member,
        members: state.member.members.map((m, i) => i === index ? member : m)
      }
    })),
    removeMember: (index) => set((state) => ({
      member: {
        ...state.member,
        members: state.member.members.filter((_, i) => i !== index)
      }
    })),
    updateMemberImgUrl: (index, imgUrl) => set((state) => ({
      member: {
        ...state.member,
        members: state.member.members.map((m, i) =>
          i === index ? { ...m, imgUrl } : m
        )
      }
    })),
    reset: () => set({
      elder: {
        name: '',
        birth: '',
        number: '',
        address: '',
        addressDetail: '',
        addressNumber: '',
        imgUrl: null,
      },
      member: {
        leader: {
          name: '',
          relation: '',
          imgUrl: null,
        },
        members: [],
      },
    }),
  }),
)