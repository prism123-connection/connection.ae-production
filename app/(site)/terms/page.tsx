import SectionHeader from '@/app/components/SectionHeader';
import React from 'react'

const termsAndConditions = [
    {
      heading: "Introduction",
      content: `These are the terms and conditions that will govern your access to and use of our website [HTTP://THECONNECTION.COM] and its related sites and services (the "Site"). Please read the following terms and conditions carefully before accessing or using the Site or any of the services provided by Connection...`,
    },
    {
      heading: "Acceptance of Terms",
      content: `By accepting these terms and conditions, and by using the Site, you agree to be legally bound by and comply with these terms and conditions with Connection effective from the date of your acceptance (the "User Agreement"). Please do not access or use the Site or the Services if you do not agree with this User Agreement...`,
    },
    {
      heading: "Membership Obligations, Password, and Security",
      content: `The right to use the Site is personal to the User and is not transferable to any other person or entity. The User is responsible for all use of the User's account and ensuring compliance with the provisions of this User Agreement...`,
    },
    {
      heading: "Changes in Terms and Service",
      subheading: "Changes in Terms",
      content: `The most current version of the User Agreement can be accessed and reviewed on the Site. Connection shall have the right at any time to change or modify the terms and conditions applicable to the User's use of the Site...`,
    },
    {
      subheading: "Change to Service",
      content: `Connection maintains complete discretion regarding the design and other elements of the overall Site. However, the specific information that the User or their employer has included on set up of their Account will remain as approved throughout the term of the subscription to the Site...`,
    },
    {
      heading: "Equipment",
      content: `The User shall be responsible for obtaining and maintaining all telephone, computer hardware, software, and other equipment needed for access to and use of the Site and all charges related thereto.`,
    },
    {
      heading: "User Conduct",
      subheading: "Lawful Use of Site",
      content: `The User shall use the Site for lawful purposes only. The User shall not post or transmit through the Site any material which violates or infringes in any way upon the rights of others, is unlawful, threatening, abusive, defamatory...`,
    },
    {
      subheading: "Copyright and Trademarks",
      content: `The Site contains copyrighted material, trademarks, and other proprietary information. The User may not modify, publish, transmit, participate in the transfer or sale, create derivative works, or in any way exploit any of the content...`,
    },
    {
      subheading: "Uploaded Content",
      content: `The User shall not upload, post, or otherwise make available on the Site any material protected by copyright, trademark, or other proprietary rights without the express permission of the owner...`,
    },
    {
      heading: "Use of Services",
      content: `The Services may contain email services, bulletin board services, chat areas, news groups, forums, communities, personal web pages, calendars, and other communication facilities designed to enable the User to communicate with others...`,
    },
    {
      heading: "Payment Method",
      content: `Any payment related to the use of Site and Services can only be made through Visa, MasterCard, or any other credit card in United Arab Emirates Dirhams. The User must retain a copy of transaction records...`,
    },
    {
      heading: "Indemnification",
      content: `The User agrees to defend, indemnify, and hold harmless Connection, its affiliates, and their respective directors, officers, employees, and agents from and against all claims and expenses, including attorneys' fees, arising out of the use of the Site and Services...`,
    },
    {
      heading: "Termination of Service",
      content: `Connection may terminate this User Agreement at any time. Without limiting the foregoing, Connection shall have the right to immediately terminate the User's Account in the event of any conduct considered unacceptable...`,
    },
    {
      heading: "Miscellaneous",
      content: `This User Agreement and any operating rules, supplemental terms, or other terms and conditions for the Site or Services established by Connection from time to time constitute the entire agreement of the parties...`,
    },
    {
      heading: "Copyright Notice",
      content: `Connection and its logos are trademarks of Connection and no User is allowed to use these trademarks without prior permission from Connection.`,
    },
    {
      heading: "Trademarks",
      content: `The names of actual companies and products and services mentioned herein and on the Site may be the trademarks of their respective owners...`,
    },
  ];

function Terms() {
  return (
    <SectionHeader classes="py-30  px-20">
    <div className='flex flex-col items-start justify-start w-full px-20'>
    {
        termsAndConditions.map((points, index)=>(
    <div className={`flex gap-2  flex-col justify-start items-start ${!points.heading ? 'mt-0' : 'mt-10'}`} key={index}>
    <span className={`text-3xl font-semibold block text-left ${points.subheading ? 'mb-5' : null}`}>{points.heading}</span>
    <span className={`text-xl font-semibold block text-left`} > {points.subheading && <>&#x2022; </>} {points.subheading}</span>
    <span className='text-base text-left '>{points.content} </span> 
    </div>
        ))
    }
    </div>
    </SectionHeader>
  )
}

export default Terms