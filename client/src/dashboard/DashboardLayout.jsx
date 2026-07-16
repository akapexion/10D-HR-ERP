import React from 'react'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar stays fixed on the left, full height */}
      <Sidebar />

      {/* Right side: navbar + scrollable content + footer */}
      <div className="flex flex-col flex-1 min-w-0">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout