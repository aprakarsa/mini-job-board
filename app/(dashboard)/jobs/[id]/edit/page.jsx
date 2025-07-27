"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditJobPage() {
    const router = useRouter();
    const params = useParams();

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("full");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Load job data on mount
    useEffect(() => {
        const fetchJob = async () => {
            const res = await fetch(
                `https://mini-job-board-rosy-eight.vercel.app/api/jobs/${params.id}`
            );
            const data = await res.json();
            if (data && !data.error) {
                setTitle(data.title);
                setCompany(data.company_name);
                setDescription(data.description);
                setLocation(data.location);
                setJobType(data.job_type || "full");
            } else {
                setError("Could not load job data.");
            }
        };
        if (params?.id) fetchJob();
    }, [params?.id]);

    // Submit edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const updatedJob = {
            title,
            company_name: company,
            description,
            location,
            job_type: jobType,
        };

        const id = Number(params.id);

        const res = await fetch(
            `https://mini-job-board-rosy-eight.vercel.app/api/jobs/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedJob),
            }
        );

        const json = await res.json();

        if (json.error) {
            setError(json.error);
        } else {
            router.refresh();
            router.push("/jobs");
        }
        setIsLoading(false);
    };

    return (
        <main>
            <h2>Edit Job</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="w-1/2">
                <label>
                    <span>Title:</span>
                    <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <span>Company Name:</span>
                    <input
                        required
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </label>
                <label>
                    <span>Description:</span>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    <span>Location:</span>
                    <input
                        required
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
                <label>
                    <span>Job Type:</span>
                    <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option value="full">Full-Time</option>
                        <option value="part">Part-Time</option>
                        <option value="contract">Contract</option>
                    </select>
                </label>
                <button className="btn-primary" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </main>
    );
}
