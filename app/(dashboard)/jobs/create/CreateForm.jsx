import SubmitButton from "@/app/components/SubmitButton";
import { addJob } from "../actions";

export default function CreateForm() {
    return (
        <form action={addJob} className="w-1/2">
            <label>
                <span>Title:</span>
                <input name="title" required type="text" />
            </label>
            <label>
                <span>Company Name:</span>
                <input name="company_name" required type="text" />
            </label>
            <label>
                <span>Description:</span>
                <textarea name="description" required />
            </label>
            <label>
                <span>Location:</span>
                <input name="location" required type="text" />
            </label>
            <label>
                <span>Job Type:</span>
                <select name="job_type">
                    <option value="full">Full-Time</option>
                    <option value="part">Part-Time</option>
                    <option value="contract">Contract</option>
                </select>
            </label>
            <SubmitButton />
        </form>
    );
}
