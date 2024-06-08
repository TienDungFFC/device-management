import { fetcher, fetcherNode } from "@/utils/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name");
  const userId = formData.get("userId");
  const id = formData.get("id");

  try {
    const res = await fetcherNode(`/devices/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, userId }),
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
