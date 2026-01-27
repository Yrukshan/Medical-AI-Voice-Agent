
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'

type Props = {

    record : SessionDetail
}

function ViewReportDialog({record} : Props) {
  return (
    <Dialog>
        <DialogTrigger>
            <Button variant={'link'} size={'sm'} className='cursor-pointer'>View Report</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle asChild>
                <h2 className='text-center text-4xl text-blue-500 underline underline-offset-8 decoration-2 inline-block'> 🩺 Medical AI Voice Agent Report : </h2>
            </DialogTitle>
            <DialogDescription asChild>
                <div className='mt-5'>
                    <h2 className='mb-5 font-bold text-blue-400 text-lg underline underline-offset-4 decoration-2 '>Session Information : </h2>

                    <div className="space-y-2 text-gray-700">
                    <h2 className="text-base">
                        <span className="font-semibold text-gray-900">
                        Doctor Specialization :
                        </span>{" "}
                        <span className="text-blue-600">
                        {record.selectedDoctor?.specialist}
                        </span>
                    </h2>

                    <h2 className="text-base">
                        <span className="font-semibold text-gray-900">
                        Appointment Number :
                        </span>{" "}
                        <span className="text-blue-600">
                        {record.id}
                        </span>
                    </h2>

                    <h2 className="text-base">
                        <span className="font-semibold text-gray-900">
                        Session Date :
                        </span>{" "}
                        <span className="text-blue-600">
                        {new Date(record.createdOn).toLocaleDateString()}
                        </span>
                    </h2>

                    <h2 className='mb-5 font-bold text-blue-400 text-lg underline underline-offset-4 decoration-2 '>Description : </h2>
                    <div className="space-y-2 text-gray-700">
                        <h2 className="text-base">
                            <span className="font-semibold text-gray-900">
                            Note :
                            </span>{" "}
                            <span className="text-blue-600">
                            {record.notes}
                            </span>
                        </h2>
                    </div>
                    </div>

                    <h2 className='mb-5 font-bold text-blue-400 text-lg underline underline-offset-4 decoration-2 '>Summery : </h2>
                    <div className="space-y-2 text-gray-700">
                        <h2 className="text-base">
                            <span className="font-semibold text-blue-900">
                            The Medical AI Voice Agent generates comprehensive session reports for each patient interaction. Each report captures key details including the doctor's specialization, 
                            appointment date, patient notes, AI-assisted recommendations, and conversation highlights. Our system provides a clear summary of all consultations, allowing patients and healthcare providers to quickly understand medical observations, 
                            advice given, and follow-up recommendations in one easy-to-read format. All reports are securely recorded and organized, offering a complete overview of patient sessions at a glance.
                            </span>{" "}
                            
                        </h2>
                    </div>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog