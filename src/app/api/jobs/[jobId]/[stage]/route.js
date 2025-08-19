import { NextResponse } from "next/server";
import { config } from "@/app/api/config";
import { connectDB } from "@/lib/db";

// CREATE STAGE FOR JOB
export async function POST(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    const { jobId, stage } = await params;
    const stageConfig = config[stage];
    try {
      await stageConfig.schema.validate(data, { abortEarly: false });
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
    const record = new stageConfig.model({ ...data, jobId });
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
