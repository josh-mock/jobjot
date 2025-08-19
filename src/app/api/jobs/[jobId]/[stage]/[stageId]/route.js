import { config } from "@/app/api/config";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

// UPDATE STAGE BY ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { stageId, stage } = await params;
    const stageConfig = config[stage];
    const data = await request.json();

    const result = await stageConfig.model.findByIdAndUpdate(stageId, data, {
      new: true,
    });
    if (!result) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: stageConfig.updateSuccessMessage, jobId: result.jobId },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE STAGE BY ID
export async function DELETE(_, { params }) {
  try {
    await connectDB();
    const { stageId, stage } = await params;
    const stageConfig = config[stage];

    const result = await stageConfig.model.findByIdAndDelete(stageId);
    if (!result) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: stageConfig.deleteSuccessMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
