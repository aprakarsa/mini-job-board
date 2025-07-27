import Link from "next/link";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

// import Image from "next/image";
// import Logo from "./mini-job-board-logo.png";

export default function Navbar({ user }) {
    return (
        <nav>
            {/* <Image
                src={Logo}
                alt="Mini Job Board Logo"
                width={70}
                placeholder="blur"
                quality={100}
            /> */}
            <h1>Mini Job Board</h1>
            <Link href="/">Dashboard</Link>
            <Link href="/jobs" className="mr-auto">
                Jobs
            </Link>

            {user && (
                <div className="flex items-center gap-2">
                    <span>Hello, {user.email}</span>
                    <LogoutButton />
                </div>
            )}

            {!user && (
                <div className="flex items-center gap-2">
                    <LoginButton />
                </div>
            )}
        </nav>
    );
}
