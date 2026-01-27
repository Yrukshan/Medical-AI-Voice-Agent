import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorAgentList from './_components/DoctorAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog'

function Dashboard() {
  return (
    <div>
      <div className='"flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center"'>
        <h2 className='font-bold text-xl sm:text-2xl text-center sm:text-left'>My Dashboard</h2>

        <div className="flex justify-center sm:justify-end">
        <AddNewSessionDialog />
        </div>
      </div>
      <HistoryList/>
      
      <DoctorAgentList />
    </div>
  )
}

export default Dashboard