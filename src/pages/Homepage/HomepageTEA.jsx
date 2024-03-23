import React, { useContext } from 'react'
import './HomepageTEAStyle.css'
import '../../assets/layout/responsive.css'
import { userdata } from '../Dashbard'
import BarChart from '../../components/Charts/Barchart'
import Piechart from '../../components/Charts/Piechart'
import DocumentstoresTEA from '../../components/Documentstores/DocumentstoresTEA'
import CountdownTEA from '../../components/Countdown/CountdownTEA'

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
      <div className="chartsContainer" style={{'--color': color}}>
        <div className="barchart">
          <BarChart />
        </div>
        <div className="piechart">
          <Piechart />
        </div>
      </div>
    </div>
  )
}

export default HomepageTEA
