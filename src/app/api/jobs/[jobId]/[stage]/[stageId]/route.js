import { auth0 } from "@/lib/auth0";
import { config } from "@/app/api/config";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

// UPDATE STAGE BY ID
export async function PUT(request, { params }) {
  try {
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.sub;

    await connectDB();
    const { stageId, stage } = await params;
    const stageConfig = config[stage];
    const data = await request.json();

    // Find the record and check ownership
    const record = await stageConfig.model.findById(stageId);
    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }
    if (record.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update if owner
    const result = await stageConfig.model.findByIdAndUpdate(stageId, data, {
      new: true,
    });
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
export async function DELETE(request, { params }) {
  try {
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.sub;

    await connectDB();
    const { stageId, stage } = await params;
    const stageConfig = config[stage];

    // Find the record and check ownership
    const record = await stageConfig.model.findById(stageId);
    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }
    if (record.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete if owner
    await stageConfig.model.findByIdAndDelete(stageId);
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
