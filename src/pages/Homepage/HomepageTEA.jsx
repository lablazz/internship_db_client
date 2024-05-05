import React, { useContext } from 'react'
import './HomepageTEAStyle.css'
import '../../assets/layout/responsive.css'
import { userdata } from '../Dashbard'
import DocumentstoresTEA from '../../components/Documentstores/DocumentstoresTEA'
import CountdownTEA from '../../components/Countdown/CountdownTEA'
import Charts from '../../components/Charts/Charts'

function HomepageTEA() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const {color} = useContext(userdata)

  return (
    <div id={'homepageTEA'}>
      <div className="welcomeCard" style={{'--color': color}}>
        <h2>Welcome</h2>
        <h3>{userData.fname} {userData.lname}</h3>
      </div>
      <div className="controlContainer">
        <CountdownTEA />
        <DocumentstoresTEA />
      </div>
      <Charts />
    </div>
  )
}

export default HomepageTEA
