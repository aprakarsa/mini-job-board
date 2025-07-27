"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogin = () => {
        return router.push("/login");
    };
    return (
        <button className="btn-primary" onClick={handleLogin}>
            Login
        </button>
    );
}
