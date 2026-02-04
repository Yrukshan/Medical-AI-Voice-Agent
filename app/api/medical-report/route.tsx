import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `
You are an AI Medical Voice Agent that just finished a voice conversation with a user.

Based on doctor AI agent info and the conversation between the AI medical agent and the user,
generate a structured medical report.

Return ONLY valid JSON in the following format:

{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1"],
  "duration": "string",
  "severity": "mild | moderate | severe",
  "medicationsMentioned": ["med1"],
  "recommendations": ["rec1"]
}
`;

export async function POST(req: NextRequest) {
  try {
    // 1️ Parse request body
    const { sessionId, sessionDetail, messages } = await req.json();

    if (!sessionId || !sessionDetail || !messages) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2️ Build AI input
    const userInput =
      `AI Doctor Agent Info:\n${JSON.stringify(sessionDetail)}\n\n` +
      `Conversation:\n${JSON.stringify(messages)}`;

    // 3️ Call AI model
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-preview-09-2025",
      temperature: 0.2,
      max_tokens: 600,
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: userInput },
      ],
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    // 4️ Clean markdown
    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 5️ Parse JSON safely
    let report: any;
    try {
      report = JSON.parse(cleaned);
    } catch {
      throw new Error("Invalid JSON returned from AI");
    }

    // 6️ Update DB with report AND conversation
    await db
      .update(SessionChatTable)
      .set({
        report,
        conversation: JSON.stringify(messages), // save conversation as JSON string
      })
      .where(eq(SessionChatTable.sessionId, sessionId));

    // 7️ Fetch updated session
    const updatedSession = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId))
      .limit(1);

    if (!updatedSession.length) {
      throw new Error("Session not found after update");
    }

    // 8️ Log and return full object
    console.log("UPDATED SESSION OBJECT:", updatedSession[0]);

    return NextResponse.json(updatedSession[0]);
  } catch (error: any) {
    console.error("Report generation error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
