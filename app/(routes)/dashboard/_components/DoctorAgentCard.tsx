"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

export type doctorAgent = {
  id: number
  specialist: string
  description: string
  image: string
  agentPrompt: string
  voiceId: string
  subscriptionRequired: boolean
}

type Props = {
  doctorAgent: doctorAgent
}

function DoctorAgentCard({ doctorAgent }: Props) {
  const { has } = useAuth()
  // @ts-ignore
  const paidUser = has && has({ plan: 'pro' })

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onStartConsultation = async () => {
    setLoading(true)

    try {
      const result = await axios.post("/api/session-chat", {
        notes: "New Query",
        selectedDoctor: doctorAgent,
      })

      const sessionId = result.data?.sessionId

      if (!sessionId) {
        console.error("sessionId missing", result.data)
        return
      }

      router.push(`/dashboard/medical-agent/${sessionId}`)
    } catch (err) {
      console.error("Session creation failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border shadow-sm hover:shadow-md transition p-3 relative">
      {doctorAgent.subscriptionRequired && (
        <Badge className="absolute m-2 right-0">Premium</Badge>
      )}

      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[250px] object-cover rounded-2xl"
      />

      <h2 className="font-bold mt-2">{doctorAgent.specialist}</h2>

      <p className="line-clamp-2 text-sm text-gray-500">
        {doctorAgent.description}
      </p>

      <Button
        className="w-full mt-2 cursor-pointer"
        onClick={onStartConsultation}
        disabled={loading || (!paidUser && doctorAgent.subscriptionRequired)}
      >
        Start Consultation{" "}
        {loading ? (
          <Loader2Icon className="animate-spin ml-2" />
        ) : (
          <IconArrowRight className="ml-2" />
        )}
      </Button>
    </div>
  )
}

export default DoctorAgentCard
