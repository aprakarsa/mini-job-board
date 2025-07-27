"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
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
