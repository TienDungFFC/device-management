import { fetcher, fetcherNode } from "@/utils/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    const res = await fetcherNode(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
