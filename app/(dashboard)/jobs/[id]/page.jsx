import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TiDocumentText } from "react-icons/ti";

// components
import DeleteButton from "./DeleteButton";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
    const supabase = createServerComponentClient({ cookies });

    const { data: job } = await supabase
        .from("jobs")
        .select()
        .eq("id", params.id)
        .single();

    return {
        title: `The Job | ${job?.title || "Job not found"}`,
    };
}

async function getJob(id) {
    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase.from("jobs").select().eq("id", id).single();

    if (!data) {
        notFound();
    }

    return data;
}

export default async function JobDetails({ params }) {
    const job = await getJob(params.id);

    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    const isOwner = data?.session?.user?.email === job.user_email;

    // Map job-type to display format
    const jobTypeDisplay = {
        full: "Full-Time",
        part: "Part-Time",
        contract: "Contract",
    };

    return (
        <main>
            <nav>
                <h2>Job Details</h2>
                <div className="ml-auto">
                    {isOwner && (
                        <div className="ml-auto flex gap-2">
                            <Link href={`/jobs/${params.id}/edit`}>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded flex items-center gap-2">
                                    <TiDocumentText />
                                    Edit Job
                                </button>
                            </Link>
                            <DeleteButton id={params.id} />
                        </div>
                    )}
                </div>
            </nav>
            <div className="card">
                <h3>{job.title}</h3>{" "}
                <small>
                    {job.company_name} &mdash; {job.location}
                </small>
                <p>{job.description}</p>
                <div className={`pill ${job["job_type"]}`}>
                    {jobTypeDisplay[job["job_type"]] || job["job_type"]}
                </div>
            </div>
        </main>
    );
}
