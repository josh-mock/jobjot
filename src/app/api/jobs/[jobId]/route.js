import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Job } from "@/components/forms/models/job.model";
import { Application } from "@/components/forms/models/application.model";
import { Interview } from "@/components/forms/models/interview.model";
import { Offer } from "@/components/forms/models/offer.model";
import { Archive } from "@/components/forms/models/archive.model";

// UPDATE OPPORTUNITY (JOB) BY ID
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { jobId } = await params;
    const body = await request.json();

    const result = await Job.findByIdAndUpdate(jobId, body, { new: true });
    if (!result) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ jobId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}

// DELETE JOB BY ID
export async function DELETE(_, { params }) {
  try {
    await connectDB();
    const { jobId } = await params;

    // Delete linked documents using jobId
    await Promise.all([
      Application.deleteMany({ jobId }),
      Interview.deleteMany({ jobId }),
      Offer.deleteMany({ jobId }),
      Archive.deleteMany({ jobId }),
    ]);

    const result = await Job.findByIdAndDelete(jobId);
    if (!result) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job and linked documents deleted successfully" },
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
