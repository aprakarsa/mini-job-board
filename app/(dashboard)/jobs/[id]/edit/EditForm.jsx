"use client";

import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { editJob } from "../../actions";

export default function EditForm({ job }) {
    const [error, setError] = useState("");
    const { pending } = useFormStatus();

    return (
        <form action={editJob} className="w-1/2">
            <input type="hidden" name="id" value={job.id} />
            <label>
                <span>Title:</span>
                <input name="title" required defaultValue={job.title} />
            </label>
            <label>
                <span>Company Name:</span>
                <input
                    name="company_name"
                    required
                    defaultValue={job.company_name}
                />
            </label>
            <label>
                <span>Description:</span>
                <textarea
                    name="description"
                    required
                    defaultValue={job.description}
                />
            </label>
            <label>
                <span>Location:</span>
                <input name="location" required defaultValue={job.location} />
            </label>
            <label>
                <span>Job Type:</span>
                <select name="job_type" defaultValue={job.job_type}>
                    <option value="full">Full-Time</option>
                    <option value="part">Part-Time</option>
                    <option value="contract">Contract</option>
                </select>
            </label>

            <button type="submit" className="btn-primary" disabled={pending}>
                {pending ? "Saving..." : "Save Changes"}
            </button>

            {error && <div className="error">{error}</div>}
        </form>
    );
}
