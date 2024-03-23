import React, { useContext } from 'react'
import HomepageADM from './Homepage/HomepageADM'
import HomepageSTD from './Homepage/HomepageSTD'
import HomepageTEA from './Homepage/HomepageTEA'
import { userdata } from './Dashbard'

const subHomepage = (data)=>{
  switch(data.role) {
    case 'adm': return <HomepageADM />
    case 'tea': return <HomepageTEA />
    case 'std': return <HomepageSTD />

    default: return (
      <h1>Page not founded</h1>
    )
  }
}

function Homepage() {
  const {userData} = useContext(userdata)
  return (
    <>
      {subHomepage(userData)}
    </>
  )
}

export default Homepage
