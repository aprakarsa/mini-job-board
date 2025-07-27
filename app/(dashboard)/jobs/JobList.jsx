"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Map API job-type values to display values
const jobTypeDisplay = {
    full: "Full-Time",
    part: "Part-Time",
    contract: "Contract",
};

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    useEffect(() => {
        async function getJobs() {
            const supabase = createClientComponentClient();
            const { data, error } = await supabase
                .from("jobs")
                .select()
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching jobs:", error.message);
            } else {
                setJobs(data);
            }

            setLoading(false);
        }

        getJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesType = jobTypeFilter
            ? job.job_type.toLowerCase() === jobTypeFilter
            : true;
        const matchesLocation = locationFilter
            ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
            : true;
        return matchesType && matchesLocation;
    });

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select
                    value={jobTypeFilter}
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                >
                    <option value="">All Job Types</option>
                    <option value="full">Full-Time</option>
                    <option value="part">Part-Time</option>
                    <option value="contract">Contract</option>
                </select>

                <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="Filter by Location"
                    className="border p-2 rounded w-full md:w-2/3"
                />
            </div>

            {loading && <p>Loading jobs...</p>}

            {!loading && filteredJobs.length === 0 && (
                <p className="text-center text-gray-500">
                    There are no matching jobs.
                </p>
            )}

            {!loading &&
                filteredJobs.map((job) => (
                    <div key={job.id} className="card my-5">
                        <Link href={`/jobs/${job.id}`}>
                            <h3>{job.title}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-semibold">
                                    {job.company_name}
                                </span>{" "}
                                &mdash; {job.location}
                            </p>
                            <p>{job.description.slice(0, 200)}...</p>
                            <div
                                className={`pill ${job["job_type"]
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                            >
                                {jobTypeDisplay[
                                    job["job_type"].toLowerCase()
                                ] || job["job_type"]}
                            </div>
                        </Link>
                    </div>
                ))}
        </>
    );
}
