import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'

type Props = {
  doctorAgent: doctorAgent
  selectedDoctor?: doctorAgent
  setSelectedDoctor: (doctor: doctorAgent) => void
}

function SuggestedDoctorCard({
  doctorAgent,
  selectedDoctor,
  setSelectedDoctor,
}: Props) {
  const isSelected = selectedDoctor?.id === doctorAgent.id

  return (
    <div
      className={`flex flex-col items-center border rounded-2xl shadow p-5
      hover:border-blue-500 cursor-pointer
      ${isSelected ? 'border-blue-500' : ''}`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <Image
        src={doctorAgent.image || '/doctor-placeholder.png'}
        alt={doctorAgent.specialist}
        width={70}
        height={70}
        className="w-[50px] h-[50px] rounded-full object-cover"
      />

      <h2 className="font-bold text-sm text-center">
        {doctorAgent.specialist}
      </h2>
      <p className="text-xs text-center line-clamp-2">
        {doctorAgent.description}
      </p>
    </div>
  )
}

export default SuggestedDoctorCard
