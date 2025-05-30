import React from 'react'

function ProfileImageSetting() {
  return (
    <div className="bg-white border flex flex-col self-stretch items-stretch w-full p-8 rounded-[20px] border-[rgba(217,217,217,1)] border-solid">
      <h2 className="text-[rgba(36,41,47,1)] text-base font-semibold leading-none">
        Profile picture
      </h2>
      <div className="flex flex-col shadow-[0px_0px_0px_1px_rgba(27,31,36,0.15)] relative aspect-[1] w-[174px] overflow-hidden items-center h-[174px] mt-4 rounded-[87px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/25690c43421494431f34cd227f1ba37a49ee9a82?placeholderIfAbsent=true"
          alt="Profile"
          className="absolute h-full w-full object-cover inset-0"
        />
        <div className="flex flex-col relative aspect-[1] w-full pt-[140px] pb-[7px] px-[7px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/eaaf6a4b9584fd1be7d627f38df9de2f8ae37ef6?placeholderIfAbsent=true"
            alt="Background"
            className="absolute h-full w-full object-cover inset-0"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/64046250a828a865f5773ef4e172ad5a1655eb7c?placeholderIfAbsent=true"
            alt="Upload"
            className="aspect-[2] object-contain w-[54px] rounded-[5px]"
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileImageSetting