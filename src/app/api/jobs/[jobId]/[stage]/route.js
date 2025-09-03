import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";
import { config } from "@/app/api/config";
import { connectDB } from "@/lib/db";
import { Job } from "@/components/forms/models/job.model";

// CREATE STAGE FOR JOB
export async function POST(request, { params }) {
  try {
    // 1. Require authentication
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.sub;

    await connectDB();
    const data = await request.json();
    const { jobId, stage } = await params;
    const stageConfig = config[stage];

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ success: false, error: "Job not found" }, { status: 404 });
    }
    if (job.userId !== userId) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const recordData = { ...data, jobId, userId };

    try {
      await stageConfig.schema.validate(recordData, { abortEarly: false });
    } catch (validationError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationError.errors,
        },
        { status: 400 }
      );
    }

    const record = new stageConfig.model(recordData);
    await record.save();
    return NextResponse.json(
      { message: stageConfig.addSuccessMessage, jobId },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}