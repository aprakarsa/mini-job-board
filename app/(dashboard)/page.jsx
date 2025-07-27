import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h2>Highlights</h2>
            <p>
                <strong>
                    Welcome to the Mini Job Board — your gateway to great
                    opportunities!
                </strong>
                <br />
                Discover exciting roles from trusted companies across various
                industries. Whether you&apos;re seeking a full-time position, a
                part-time gig, or a freelance contract, our platform makes it
                easy to find and apply for jobs that match your skills and
                passion.
            </p>

            <div className="flex justify-center my-8">
                <Link href="/jobs">
                    <button className="btn-primary">View Jobs</button>
                </Link>
            </div>

            <h2>Job Board Updates</h2>

            <div className="card">
                <h3>New feature: Filter jobs by location and type!</h3>
                <p>
                    We&apos;re excited to roll out new filtering options to help
                    you find the right job faster. You can now filter job
                    listings by location and employment type (full-time,
                    part-time, contract) directly on the dashboard.
                </p>
            </div>
            <div className="card">
                <h3>Faster performance & cleaner interface</h3>
                <p>
                    We&apos;ve improved page load times and polished the
                    interface to make your job search experience smoother and
                    more enjoyable. Let us know what you think!
                </p>
            </div>
        </main>
    );
}
