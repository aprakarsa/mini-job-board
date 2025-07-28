"use server";

import {
    createServerActionClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addJob(formData) {
    const job = Object.fromEntries(formData);

    const supabase = createServerActionClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // insert the data
    const { error } = await supabase.from("jobs").insert({
        ...job,
        user_email: session.user.email,
    });

    if (error) {
        throw new Error("Problem! Could not add a new job..");
    }

    revalidatePath("/jobs");
    redirect("/jobs");
}

export async function deleteJob(id) {
    const supabase = createServerActionClient({ cookies });

    // delete the data
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
        throw new Error("Oh No!! Could not delete the job");
    }

    revalidatePath("/jobs");
    redirect("/jobs");
}

export async function editJob(formData) {
    const supabase = createServerActionClient({ cookies });
    const job = Object.fromEntries(formData);
    const id = job.id;

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { error } = await supabase
        .from("jobs")
        .update({
            title: job.title,
            company_name: job.company_name,
            description: job.description,
            location: job.location,
            job_type: job.job_type,
        })
        .eq("id", id)
        .eq("user_email", session.user.email);

    if (error) {
        throw new Error("Problem! Could not update the job.");
    }

    revalidatePath("/jobs");
    redirect("/jobs");
}

export async function getJob(id) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from("jobs").select().eq("id", id).single();

    if (!data) throw new Error("Job not found");

    return data;
}
