import React from 'react'

function SecretPage() {
  return (
    <div>
      <div>{process.env.DATABASE_URL}</div>
      <div>{process.env.DEPLOYED_URL}</div>
      <div>{process.env.JWT_SECRET}</div>
      <div>{process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}</div>
      <div>{process.env.PAYPAL_CLIENT_ID}</div>
      <div>{process.env.PAYPAL_CLIENT_SECRET}</div>
      <div>{process.env.PAYPAL_ENVIRONMENT}</div>
      <div>{process.env.SMTP_EMAIL}</div>
      <div>{process.env.SMTP_NAME}</div>
      <div>{process.env.SMTP_PASSWORD}</div>
      <div>{process.env.TEST_ENV}</div>
    </div>
  )
}

export default SecretPage