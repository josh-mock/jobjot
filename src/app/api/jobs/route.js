import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { jobSchema } from "@/components/forms/schemas/job.schema";
import { Job } from "@/components/forms/models/job.model";
import { Archive } from "@/components/forms/models/archive.model";
import { Application } from "@/components/forms/models/application.model";
import { Interview } from "@/components/forms/models/interview.model";
import { Offer } from "@/components/forms/models/offer.model";

// CREATE NEW JOB

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    try {
      await jobSchema.validate(data, { abortEarly: false });
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
    const job = new Job(data);
    await job.save();
    return NextResponse.json({ jobId: job._id }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// READ ALL JOBS

export async function GET() {
  try {
    await connectDB();

    const jobs = await Job.aggregate([
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "jobId",
          as: "application",
        },
      },
      {
        $lookup: {
          from: "interviews",
          localField: "_id",
          foreignField: "jobId",
          as: "interviews",
        },
      },
      {
        $lookup: {
          from: "offers",
          localField: "_id",
          foreignField: "jobId",
          as: "offer",
        },
      },
      {
        $lookup: {
          from: "archives",
          localField: "_id",
          foreignField: "jobId",
          as: "archive",
        },
      },
      {
        $addFields: {
          stage: {
            $switch: {
              branches: [
                {
                  case: { $gt: [{ $size: "$archive" }, 0] },
                  then: "archive",
                },
                {
                  case: { $gt: [{ $size: "$offer" }, 0] },
                  then: "offer",
                },
                {
                  case: { $gt: [{ $size: "$interviews" }, 0] },
                  then: "interview",
                },
                {
                  case: { $gt: [{ $size: "$application" }, 0] },
                  then: "application",
                },
              ],
              default: "opportunity",
            },
          },
        },
      },
      {
        $addFields: {
          application: { $arrayElemAt: ["$application", 0] },
          interviews: "$interviews",
          offer: { $arrayElemAt: ["$offer", 0] },
          archive: { $arrayElemAt: ["$archive", 0] },
        },
      },
    ]);

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

// DELETE ALL JOBS
export async function DELETE() {
  try {
    await connectDB();
    const result = await Promise.all([
      Application.collection.drop(),
      Interview.collection.drop(),
      Offer.collection.drop(),
      Archive.collection.drop(),
      Job.collection.drop(),
    ]);

    if (!result) {
      return NextResponse.json(
        { error: "There was an error" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Database reset successfully!" },
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
