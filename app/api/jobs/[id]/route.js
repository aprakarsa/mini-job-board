import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function DELETE(_, { params }) {
    const id = params.id;

    const supabase = createRouteHandlerClient({ cookies });

    const { error } = await supabase.from("jobs").delete().eq("id", id);

    return NextResponse.json({ error });
}

export async function GET(_, { params }) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
        .from("jobs")
        .select()
        .eq("id", params.id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(data);
}

export async function PUT(request, { params }) {
    const job = await request.json();
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
        .from("jobs")
        .update(job)
        .eq("id", params.id)
        .select()
        .maybeSingle();

    return NextResponse.json({ data, error: error?.message || null });
}
