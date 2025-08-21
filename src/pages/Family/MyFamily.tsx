import { Card_Reciever } from "@/components/Card_Reciever"
import { Member_List, Member_List_Leader } from "@/components/Member_List"
import button_plus from '@/assets/icons/button_plus.svg'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { apiClient } from '@/shared/api/client'
import { useFamilyStore } from '@/stores/family.store'
import { useLeaderStore } from "@/stores/Leader.store"

const MyFamily: React.FC = () => {
  const navigate = useNavigate()
  const { elder, member, setElder, setMembers, setLeader } = useFamilyStore()
  const { isLeader, setIsLeader } = useLeaderStore()

  const handleElderInfo = () => {
    navigate('/my-family/elder-info')
  }

  const handleInvite = () => {
    navigate('/family/invite')
  }

  useEffect(() => {
    const fetchFamilyData = async () => {
      try {
        const response = await apiClient.get('/api/family')
        const data = response.data

        console.log('백엔드에서 받은 데이터:', data)

        // 어르신 정보 저장
        if (data.data?.elder) {
          setElder({
            name: data.data.elder.name || '',
            birth: data.data.elder.birth || '',
            number: data.data.elder.number || '',
            address: data.data.elder.address || '',
            addressDetail: data.data.elder.addressDetail || '',
            addressNumber: data.data.elder.addressNumber || '',
            imgUrl: data.data.elder.img?.cid || null,
          })
        }

        // 그룹장 정보 저장
        if (data.data?.member?.leader) {
          setLeader({
            name: data.data.member.leader.name || '',
            relation: data.data.member.leader.relation || '',
            imgUrl: data.data.member.leader.img?.cid || null,
          })
        }

        // 멤버들 정보 저장
        if (data.data?.member?.members && Array.isArray(data.data.member.members)) {
          const members = data.data.member.members.map(
            (member: { name?: string; relation?: string; img?: { cid?: string | null } | null }) => ({
              name: member.name || '',
              relation: member.relation || '',
              imgUrl: member.img?.cid || null,
            }),
          )
          setMembers(members)
        }

        setIsLeader(data.data.member.isLeader)

        console.log('Store에 저장된 데이터:', { elder, member })
      } catch (error) {
        console.error('가족 데이터를 가져오는 중 오류 발생:', error)
      }
    }

    fetchFamilyData()
  }, [setElder, setLeader, setMembers])

  return (
    <div className="bg-background min-h-[calc(100vh-56px)] flex flex-col px-6">
      <div className="mt-6 mb-5">
        <p className="text-xl font-semibold mb-4">받는 분 정보</p>
        <Card_Reciever name={elder.name} date={elder.birth} imgUrl={elder.imgUrl} onClick={handleElderInfo} />
      </div>

      <div className="flex flex-col gap-4 bg-white rounded-xl p-2 border-gray-200 border">
        <div className="flex flex-row items-center gap-4">
          <p className="font-semibold text-xl">가족 그룹 멤버 목록</p>
          <div className="flex flex-row items-center gap-1">
            <p>멤버 {member.members.length + 1}명</p>
            <img src={button_plus} alt="button_plus" className="w-8 h-8" onClick={handleInvite} />
          </div>
        </div>
        {member.leader.name && (
          <Member_List_Leader
            name={member.leader.name}
            relation={member.leader.relation}
            imgUrl={member.leader.imgUrl}
          />
        )}
        {member.members.map((memberItem, index) => (
          <Member_List key={index} name={memberItem.name} relation={memberItem.relation} imgUrl={memberItem.imgUrl} />
        ))}
      </div>
    </div>
  )
}

export default MyFamily