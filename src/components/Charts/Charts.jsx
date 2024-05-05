import React from 'react'
import './chart-layout.css'
import BarchartCompany from './BarchartCompany'
import BarchartWishlist from './BarchartWishlist'
import PiechartWorkDetail from './PiechartWorkDetail'

function Charts() {
  return (
    <div className='chart-container'>
      <div className="bar-chart-1">
        <BarchartWishlist />
      </div>
      <div className="bar-chart-2">
        <BarchartCompany />
      </div>
      <div className="pie-chart">
        <PiechartWorkDetail />
      </div>
    </div>
  )
}

export default Charts
