import React from 'react'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/button'
import InputField from '../../ui/InputFields'
import ActionButton from '../../ui/ActionButton'

function PasswordUpdateSetting() {
  return (
    <div className="flex flex-col gap-5 my-10">
    <h2 className="text-2xl leading-none">Change Password</h2>
    <InputField label="Current password" placeholder="****" className='mt-2' />
    <InputField label="New password"  placeholder="****"  className='mt-2'/>
    <InputField label="Confirm new password" placeholder="****"  className='mt-2'/>
    <ActionButton variant="primary">Update password</ActionButton>
  </div>
  )
}

export default PasswordUpdateSetting