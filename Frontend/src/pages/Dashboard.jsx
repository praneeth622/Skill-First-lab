import React from 'react';
import Mainbar from '../components/Mainbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

function Dashboard() {
  return (
    <div className="flex flex-col h-screen antialiased bg-gray-50">
      <div className="flex-shrink-0">
        <Mainbar />
      </div>
      <div className="flex flex-grow">
        <div className="flex-shrink-0 w-64"> {/* Adjust the width as needed */}
          <Sidebar />
        </div>
        <div className="flex-grow overflow-y-auto pl-3 mt-14">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
