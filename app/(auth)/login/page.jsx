"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        setError("");

        const supabase = createClientComponentClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }
        if (!error) {
            router.refresh();
            router.push("/");
        }
    };

    return (
        <main>
            <h2 className="text-center">Log in</h2>

            <AuthForm handleSubmit={handleSubmit} />
            <p className="mt-3 text-sm text-center">
                Not registered yet?{" "}
                <a
                    href="/signup"
                    className="text-blue-600 hover:text-blue-800 font-medium underline transition duration-150 ease-in-out"
                >
                    Click here to sign up.
                </a>
            </p>

            {error && <div className="error">{error}</div>}
        </main>
    );
}
