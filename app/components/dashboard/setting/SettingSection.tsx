import React from "react";
import { Input } from "@/app/components/ui/Input";
// import { Button } from "@/components/settings/Button";
import ProfileImageSetting  from "./ProfileImage";
import PasswordUpdateSetting  from './PasswordSection'
import CompanyDetailSetting from "./CompanyDetail";
import InputField from "../../ui/InputFields";
import ActionButton from "../../ui/ActionButton";

const SettingSection = () => {
  return (
    <div className=" flex items-center gap-2.5 overflow-hidden justify-center w-full ">
      <div className="self-stretch min-w-60 w-full my-auto">
        <div className="bg-white flex w-full flex-col px-20 py-5  rounded-2xl max-md:max-w-full max-md:px-5">
          <div className="self-stretch max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[70%] max-md:w-full max-md:ml-0">
                <div className="flex w-full flex-col text-sm text-[rgba(36,41,47,1)] font-semibold max-md:max-w-full max-md:mt-8">
                  <div className="flex items-stretch gap-3 text-[32px] text-[rgba(0,22,37,1)] whitespace-nowrap leading-none mb-5">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/30453e9098a125b2ce9da184acf11a2856f6b573?placeholderIfAbsent=true"
                      alt="Settings icon"
                      className="aspect-[1] object-contain w-6 shrink-0 my-auto"
                    />
                    <h1 className="basis-auto">Settings</h1>
                  </div>

                  <InputField label="Name" placeholder="Salim Ahmed" className="mt-2 mb-5" />

                  <InputField label="User name" placeholder="Salim_001" className="mt-2" />

                  <PasswordUpdateSetting />
                </div>
              </div>

              <div className="w-[35%] ml-5 max-md:w-full max-md:ml-0">
                <ProfileImageSetting />
              </div>
            </div>
          </div>

          <CompanyDetailSetting />

          <div className="self-center flex  max-w-full items-stretch gap-2 mt-[37px]">
            <ActionButton variant="secondary">Cancel</ActionButton>
            <ActionButton variant="primary">Update profile</ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingSection;