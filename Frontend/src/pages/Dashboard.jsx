import React from 'react'
import Mainbar from '../components/Mainbar'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

function Dashboard() {
  return (
    <div>
      <div className="antialiased bg-gray-50 ">
        <div>
          <Mainbar />
          </div>
        <div>
          <Sidebar />
          </div>
        <div> 
          <Content />
        </div>
        
        
       
      </div>

    </div>
  )
}

export default Dashboard