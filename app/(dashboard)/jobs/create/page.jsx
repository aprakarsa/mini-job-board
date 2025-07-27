import CreateForm from "./CreateForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AddJob() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    // if not logged in redirect to the login page
    if (!data.session) {
        redirect("/login");
    }

    return (
        <main>
            <h2 className="text-primary">Add a New Job</h2>
            <CreateForm />
        </main>
    );
}
