"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: { 
    sessionId: string;
    agent: string;
    user: string;
    timestamp: string;
    chiefComplaint: string;
    summary: string;
    symptoms: string[];
    duration: string;
    severity: string;
    medicationsMentioned: string[];
    recommendations: string[];} | null;
  conversation: any[]; // array of messages
  selectedDoctor: doctorAgent;
  createdOn: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter(); // initialize router

  const [sessionDetail, setSessionDetail] = useState<SessionDetail | null>(null);
  const [callStarted, setCallStarted] = useState(false);

  // Live transcript
  const [assistantMsg, setAssistantMsg] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const vapiRef = useRef<Vapi | null>(null);

  /* -------------------- INIT VAPI -------------------- */
  useEffect(() => {
    if (vapiRef.current) return;

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

    vapi.on("call-start", () => {
      setCallStarted(true);
      setAssistantMsg("");
      setUserMsg("");
    });

    vapi.on("call-end", () => {
      setCallStarted(false);
    });

    vapi.on("message", (message: any) => {
      if (message.type === "transcript") {
        if (message.role === "assistant") {
          setAssistantMsg(message.transcript);
        } else if (message.role === "user") {
          setUserMsg(message.transcript);
        }
      }
    });

    vapiRef.current = vapi;

    return () => {
      vapi.stop();
    };
  }, []);

  /* -------------------- LOAD SESSION -------------------- */
  useEffect(() => {
    if (!sessionId) return;
    getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    try {
      const res = await axios.get("/api/session-chat?sessionId=" + sessionId);
      setSessionDetail(res.data);
    } catch (err) {
      console.error("Error loading session:", err);
    }
  };

  /* -------------------- CALL CONTROLS -------------------- */
  const startCall = () => {
    vapiRef.current?.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
  };

  const endCall = async () => {
    vapiRef.current?.stop();

    await generateReport();

    // Navigate to dashboard after report generation
    router.push("/dashboard");
  };

  /* -------------------- GENERATE REPORT -------------------- */
  const generateReport = async () => {
    if (!sessionDetail) return;

    const messages = [
      { role: "assistant", content: assistantMsg },
      { role: "user", content: userMsg }
    ];

    try {
      await axios.post("/api/medical-report", {
        messages,
        sessionDetail,
        sessionId
      });
    } catch (err) {
      console.error("Error generating report:", err);
    }
  };

  if (!sessionDetail) return null;

  return (
    <div className="p-5 border-8 rounded-3xl bg-secondary">
      {/* Status Bar */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {/* Doctor Info */}
      <div className="flex items-center flex-col mt-10">
        <Image
          src={sessionDetail.selectedDoctor.image}
          alt={sessionDetail.selectedDoctor.specialist}
          width={120}
          height={120}
          className="h-[100px] w-[100px] object-cover rounded-full"
        />

        <h2 className="mt-2 text-lg font-semibold">
          {sessionDetail.selectedDoctor.specialist}
        </h2>

        <p className="font-bold text-sm text-gray-500">
          AI Medical Voice Agent
        </p>

        {/* LIVE TRANSCRIPT */}
        <div className="mt-32 text-center">
          <h2 className="font-bold text-gray-400">Assistant</h2>
          <h2 className="font-bold text-lg">
            {assistantMsg || "Listening..."}
          </h2>

          <h2 className="font-bold text-gray-400 mt-4">You</h2>
          <h2 className="font-bold text-lg">
            {userMsg || "Speak now"}
          </h2>
        </div>

        {/* Action Button */}
        {!callStarted ? (
          <Button className="mt-20 flex gap-2 cursor-pointer" onClick={startCall}>
            <PhoneCall /> Start Call
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="mt-20 flex gap-2 cursor-pointer"
            onClick={endCall} // will generate report & navigate
          >
            <PhoneOff /> Disconnect
          </Button>
        )}
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;
