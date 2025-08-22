import profileImage from '@/assets/images/profile.png'
import { TextField } from '@/components/TextField'
import { useEffect, useState } from 'react'
import { CTA } from '@/components/Buttons'
import { useNavigate } from 'react-router-dom'
import { Dropdown_Relation } from '@/components/Dropdown_Relation'
import { Dropdown_Date } from '@/components/Dropdown_Date'
import { useMyInfoStore } from '@/stores/myInfo.store'
import { PhoneField } from '@/components/PhoneField'
import { apiClient } from '@/shared/api/client'

const MyInfo_EditPage: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [relation, setRelation] = useState('')
  const [birthday, setBirthday] = useState('')
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const { InfoData, setInfoData } = useMyInfoStore()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }
  const handleSave = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('number', phone)
    formData.append('relation', relation)
    formData.append('birth', birthday)

    if (selectedImage) {
      formData.append('img', selectedImage)
    }

    apiClient.patch('/public/user', formData).then(res => {
      console.log(res)
      setInfoData({
        name: name,
        phone: phone,
        relation: relation,
        birthday: birthday,
        provider: InfoData.provider,
      })
      if (selectedImage) {
        setImgUrl(URL.createObjectURL(selectedImage))
      }
    })
    navigate('/mypage/info')
  }

  useEffect(() => {
    apiClient.get('/api/user').then(res => {
      setName(res.data.data.userInfoDto.name)
      setPhone(res.data.data.userInfoDto.number)
      setRelation(res.data.data.userInfoDto.relation)
      setBirthday(res.data.data.userInfoDto.birth)
      setImgUrl(res.data.data.userInfoDto.img?.cid || null)
    })
  }, [])

  return (
    <div className="bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4">
      <div className="flex flex-col gap-4 mt-4">
        <div className="relative">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="profile"
              className="w-[84px] h-[84px] mx-auto rounded-full object-cover"
            />
          ) : imgUrl ? (
            <img
              src={`https://api.deardream.r-e.kr/ipfs/${imgUrl}`}
              alt="profile"
              className="w-[84px] h-[84px] mx-auto rounded-full object-cover bg-gray-400"
            />
          ) : (
            <img src={profileImage} alt="profile" className="w-[84px] h-[84px] mx-auto rounded-full" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-normal">이름</p>
        <TextField value={name} onChange={setName} placeholder="이름을 입력해주세요." />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-normal">생년월일</p>
        <Dropdown_Date value={birthday} onChange={setBirthday} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-normal">전화번호</p>
        <PhoneField value={phone} onChange={setPhone} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-normal">소식을 전해줄 분과는 어떤 관계인가요?</p>
        <Dropdown_Relation value={relation} onChange={setRelation} />
      </div>

      <CTA className="mt-auto mb-9" text="수정하기" variant="main" onClick={handleSave} />
    </div>
  )
}

export default MyInfo_EditPage