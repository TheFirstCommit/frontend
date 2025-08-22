import profileImage from '@/assets/images/profile.png'
import { TextField } from '@/components/TextField'
import { Dropdown_Date } from '@/components/Dropdown_Date'
import { useEffect, useState } from 'react'
import { Button, CTA } from '@/components/Buttons'
import { useNavigate } from 'react-router-dom'
import { useFamilyStore } from '@/stores/family.store'
import { apiClient } from '@/shared/api/client'
import { PhoneField } from '@/components/PhoneField'

const ElderInfo_EditPage: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const { elder, setElderImgUrl, setElder } = useFamilyStore()

  useEffect(() => {
    setName(elder.name)
    setBirthday(elder.birth)
    setPhone(elder.number)
    setAddressNumber(elder.addressNumber)
    setAddress(elder.address)
    setAddressDetail(elder.addressDetail)
  }, [elder])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const handleBirthdayChange = (formattedDate: string) => {
    setBirthday(formattedDate)
  }

  const openAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data: { zonecode: string; address: string }) {
        setAddressNumber(data.zonecode)
        setAddress(data.address)
      },
    }).open()
  }

  const handleSave = () => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('birth', birthday)
    formData.append('number', phone)
    formData.append('addressNumber', addressNumber)
    formData.append('address', address)
    formData.append('addressDetail', addressDetail)

    // 이미지 파일이 선택된 경우에만 추가
    if (selectedImage) {
      formData.append('elderImg', selectedImage)
    }

    apiClient.patch('/api/family/elder', formData).then(res => {
      console.log(res)
      // 성공 시 store의 이미지 URL도 업데이트
      setElder({
        name: name,
        birth: birthday,
        number: phone,
        address: address,
        addressDetail: addressDetail,
        addressNumber: addressNumber,
      })
      if (selectedImage) {
        setElderImgUrl(URL.createObjectURL(selectedImage))
      }
      navigate('/my-family/elder-info')
    })
  }

  return (
    <div className="bg-background min-h-[calc(100vh-56px)] flex flex-col px-6 gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between mt-6">
          <p className="text-[16px]">
            <span className="font-semibold">소식지를 전달받을 분</span>의 정보를 입력해주세요.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="profile"
                className="w-[84px] h-[84px] mx-auto rounded-full object-cover"
              />
            ) : elder.imgUrl ? (
              <img
                src={`https://api.deardream.r-e.kr/ipfs/${elder.imgUrl}`}
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
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-normal">이름</p>
        <TextField value={name} onChange={setName} placeholder="이름을 입력해주세요." />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-normal">생년월일</p>
        <Dropdown_Date
          value={birthday}
          onChange={handleBirthdayChange}
          defaultYear={1950}
          defaultMonth={1}
          defaultDay={1}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-normal">전화번호</p>
        <PhoneField value={phone} onChange={setPhone} />
      </div>

      <div className="flex flex-col gap-3">
        <p>배송지 주소</p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <TextField value={addressNumber} onChange={setAddressNumber} disabled={true} placeholder="우편번호" />
            <Button className="w-[50%]" text="우편번호 찾기" variant="secondary" onClick={openAddress} />
          </div>
          <TextField value={address} onChange={setAddress} disabled={true} placeholder="주소지" />
          <TextField value={addressDetail} onChange={setAddressDetail} placeholder="상세주소를 입력하세요." />
        </div>
      </div>

      <CTA className="mt-auto mb-9" text="저장하기" variant="main" onClick={handleSave} />
    </div>
  )
}

export default ElderInfo_EditPage
