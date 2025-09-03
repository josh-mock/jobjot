import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Job } from "@/components/forms/models/job.model";
import { Application } from "@/components/forms/models/application.model";
import { Interview } from "@/components/forms/models/interview.model";
import { Offer } from "@/components/forms/models/offer.model";
import { Archive } from "@/components/forms/models/archive.model";
import { auth0 } from "@/lib/auth0";

// UPDATE OPPORTUNITY (JOB) BY ID
export async function PUT(request, { params }) {
  try {
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { jobId } = await params;
    const body = await request.json();

    // Ensure the job belongs to the current user
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    if (job.userId !== session.user.sub) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const result = await Job.findByIdAndUpdate(jobId, body, { new: true });
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
export async function DELETE(request, { params }) {
  try {
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { jobId } = await params;

    // Ensure the job belongs to the current user
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    if (job.userId !== session.user.sub) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete linked documents using jobId
    await Promise.all([
      Application.deleteMany({ jobId }),
      Interview.deleteMany({ jobId }),
      Offer.deleteMany({ jobId }),
      Archive.deleteMany({ jobId }),
    ]);

    await Job.findByIdAndDelete(jobId);

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
