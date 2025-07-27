import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginButton from "../components/LoginButton";

export default async function AuthLayout({ children }) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        redirect("/");
    }

    return (
        <>
            <nav>
                <h1>Mini Job Board</h1>
                <Link href="/" className="mr-auto">
                    Dashboard
                </Link>

                <div className="flex items-center gap-2">
                    <LoginButton />
                </div>
            </nav>
            {children}
        </>
    );
}
