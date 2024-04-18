import React from 'react'
import SidebarNavbar from './SideNavbar'
import Search from './Search'
import Chats from './Chats'
function Sidebar(props) {
  return (
    <div className="sidebar">
      <SidebarNavbar />
      <Search />
      <Chats {...props} />
    </div>
  )
}

export default Sidebar
