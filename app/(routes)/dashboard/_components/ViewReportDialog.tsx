
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
                <h2 className='text-center text-4xl text-blue-500 decoration-2 inline-block'> 🩺 Medical AI Voice Agent Report </h2>
            </DialogTitle>
            <DialogDescription asChild>
                <div className='max-h-[80vh] overflow-y-auto p-6 rounded-2xl scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100hover:scrollbar-thumb-blue-500transition-all'>
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
                        {record.report?.timestamp}
                        </span>
                    </h2>

                    {/* <h2 className="text-base">
                        <span className="font-semibold text-gray-900">
                        Session Date :
                        </span>{" "}
                        <span className="text-blue-600">
                        {new Date(record.createdOn).toLocaleDateString()}
                        </span>
                    </h2> */}

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

                        <h2 className="text-base">
                            <span className="font-semibold text-gray-900">
                            Main Medical Concern :
                            </span>{" "}
                            <span className="text-blue-600">
                            {record.report?.chiefComplaint}
                            </span>
                        </h2>

                        <h2 className="text-base">
                            <span className="font-semibold text-gray-900">
                            Symptoms :
                            </span>{" "}
                            <span className="text-blue-600">
                            {record.report?.symptoms}
                            </span>
                        </h2>

                    </div>
                    </div>
                        
                    <br />    
                    <h2 className='mb-5 font-bold text-blue-400 text-lg underline underline-offset-4 decoration-2 '>Summery : </h2>
                    <div className="space-y-2 text-gray-700">
                        <h2 className="text-base">
                            <span className="font-semibold text-blue-900">
                            {record.report?.summary}
                            </span>
                            
                        </h2>
                    </div>
                    
                    <br /> 
                    <h2 className='mb-5 font-bold text-blue-400 text-lg underline underline-offset-4 decoration-2 '>Recommendations : </h2>
                    <div className="space-y-2 text-gray-700">
                        <h2 className="text-base">
                            <span className="font-semibold text-blue-900">
                            {record.report?.recommendations}
                            </span>
                            
                        </h2>
                    </div>
                    
                    <br />
                    <h2 className='mb-5 font-bold text-blue-400 text-lg underline underline-offset-4 decoration-2 '>Medications Mentioned : </h2>
                    <div className="space-y-2 text-gray-700">
                        <h2 className="text-base">
                            <span className="font-semibold text-blue-900">
                            {record.report?.medicationsMentioned}
                            </span>
                            
                        </h2>
                    </div>
                    
                    <br />
                    <h2 className='mb-5 font-bold text-blue-400 text-lg underline underline-offset-4 decoration-2'>
                    Overview of AI Medical Reporting :
                    </h2>
                    <div className="space-y-2 text-gray-700">
                    <h2 className="text-base">
                        <span className="font-semibold text-blue-900">
                        The Medical AI Voice Agent creates a clear and easy-to-read report after every 
                        conversation with you. The report includes important details such as the doctor’s 
                        area of expertise, the date of your session, what you shared about your symptoms, 
                        and helpful suggestions from the AI assistant.  
                        Your conversation is summarized in simple language so you can easily understand 
                        what was discussed and what to do next.  
                        All your reports are stored safely and neatly, so you can look back at them anytime 
                        and keep track of your health journey with confidence.
                        </span>
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