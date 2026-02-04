"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { doctorAgent } from "./DoctorAgentCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

function AddNewSessionDialog() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | undefined>();

  const router = useRouter();

  const [historyList, setHistoryList] = useState <SessionDetail []> ([]);

    const { has } = useAuth();
    // @ts-ignore
    const paidUser = has && has({ plan: 'pro' });
  
        useEffect(() => {
          GetHistoryList();
    
        }, []);
    
        const GetHistoryList = async() => {
    
          const result = await axios.get('/api/session-chat?sessionId=all');
          console.log(result.data);
          setHistoryList(result.data);
        }

  // STEP 1
  const OnClickNext = async () => {
    if (!note) return;
    setLoading(true);

    try {
      const result = await axios.post("/api/suggest-doctors", { notes: note });
      const doctorsArray = Array.isArray(result.data)
        ? result.data
        : [result.data];

      setSuggestedDoctors(doctorsArray);
    } catch (err) {
      console.error("Doctor suggestion failed", err);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2
  const onStartConsultation = async () => {
    if (!selectedDoctor) return;

    setLoading(true);

    try {
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor,
      });

      console.log("SESSION CREATED 👉", result.data);

      const sessionId = result.data?.sessionId;

      if (!sessionId) {
        console.error("sessionId missing", result.data);
        return;
      }

      // THIS NOW WORKS
      router.push(`/dashboard/medical-agent/${sessionId}`);
    } catch (err) {
      console.error("Session creation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3 cursor-pointer" disabled = {!paidUser && historyList?.length >=5} >+ Start a Consultation</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>

          <DialogDescription asChild>
            {suggestedDoctors.length === 0 ? (
              <div>
                <h2>Add Symptoms or Details</h2>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="h-[200px]"
                  placeholder="Describe symptoms..."
                />
              </div>
            ) : (
              <div>
                <h2>Select Doctor</h2>
                <div className="grid grid-cols-3 gap-5">
                  {suggestedDoctors.map((doctor) => (
                    <SuggestedDoctorCard
                      key={doctor.id}
                      doctorAgent={doctor}
                      selectedDoctor={selectedDoctor}
                      setSelectedDoctor={setSelectedDoctor}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>

          {suggestedDoctors.length === 0 ? (
            <Button disabled={!note || loading} onClick={OnClickNext} className="cursor-pointer">
              Next{" "}
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          ) : (
            <Button
              className="cursor-pointer"
              disabled={!selectedDoctor || loading}
              onClick={onStartConsultation}
            >
              Start Consultation{" "}
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
