import { fetcher, fetcherNode } from "@/utils/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const res = await fetcherNode(`/users/${id}/records`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err ?? null), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
