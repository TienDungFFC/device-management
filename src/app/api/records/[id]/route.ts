export const revalidate = 0;

import { fetcher, fetcherNode } from "@/utils/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  const formData = await req.formData();
  const type = formData.get("type");
  try {
    const res = await fetcherNode(`/${type === '0' ? 'videos' : 'timelines'}/${id}`, {
      method: "DELETE",
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
