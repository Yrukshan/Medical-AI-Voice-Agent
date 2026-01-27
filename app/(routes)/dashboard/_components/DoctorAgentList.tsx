import { AIDoctorAgents } from '@/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'


function DoctorAgentList() {
  return (
    <div className='mt-6 sm:mt-10 px-4 sm:px-0'>
        <h2 className='font-bold text-lg sm:text-xl text-center'>AI Specialist Doctor Agent</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-10'>
            {AIDoctorAgents.map((doctor,index)=>(
                <div key={index}>
                    <DoctorAgentCard  doctorAgent = {doctor}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoctorAgentList