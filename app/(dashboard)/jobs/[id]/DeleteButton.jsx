"use client";

import { TiDocumentDelete } from "react-icons/ti";
import { useTransition } from "react";
import { deleteJob } from "../actions";

export default function DeleteButton({ id }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center gap-2"
            onClick={() => startTransition(() => deleteJob(id))}
            disabled={isPending}
        >
            {isPending && (
                <>
                    <TiDocumentDelete />
                    Deleting...
                </>
            )}
            {!isPending && (
                <>
                    <TiDocumentDelete />
                    Delete Job
                </>
            )}
        </button>
    );
}
