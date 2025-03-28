import React from 'react'
import SectionHeader from '../../../SectionHeader'
import AffiliatePrimary from './PrimaryAffiliate'
import SecondaryAffiliate from './SecondaryAffiliate'


function AffiliateSection() {
  return (
    <SectionHeader classes=' overflow-hidden justify-start items-start shadow-sm! gap-10 '>
       <AffiliatePrimary/>
       <SecondaryAffiliate/>
    </SectionHeader>
  )
}

export default AffiliateSection