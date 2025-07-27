import Link from "next/link";

export default function NotFound() {
    return (
        <main className="text-center">
            <h2 className="text-3xl">There was a problem</h2>
            <p>The page that you are looking for is not available.</p>
            <p>
                Go back to the <Link href="/">Dashboard</Link>.
            </p>
        </main>
    );
}
