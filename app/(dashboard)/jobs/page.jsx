import Loading from "../loading";
import JobList from "./JobList";
import { Suspense } from "react";
import Link from "next/link";
import { TiDocumentAdd } from "react-icons/ti";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const metadata = {
    title: "The List",
};

export default async function Jobs() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    return (
        <main>
            <nav>
                <div>
                    <h2>Job List</h2>
                    <p>
                        <small>Currently open Jobs.</small>
                    </p>
                </div>

                {data.session && (
                    <Link href="/jobs/create" className="ml-auto">
                        <button className="btn-primary">
                            {<TiDocumentAdd />}
                            Add Job
                        </button>
                    </Link>
                )}
            </nav>

            <Suspense fallback={<Loading />}>
                <JobList />
            </Suspense>
        </main>
    );
}
