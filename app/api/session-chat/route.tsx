import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sessionId = uuidv4();

    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId,
        createdBy: user.primaryEmailAddress.emailAddress,
        notes,
        selectedDoctor,
        createOn: new Date().toISOString(),
      })
      .returning();

    // ✅ return single object
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("SESSION CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId required" },
        { status: 400 }
      );
    }

    if (sessionId === "all") {

      const result = await db
      .select()
      .from(SessionChatTable)
      // @ts-ignore
      .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(SessionChatTable.id));

      return NextResponse.json(result);

    }
    else {

      const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId));

      return NextResponse.json(result[0]);

    }
    
  } catch (error) {
    console.error("SESSION FETCH ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
