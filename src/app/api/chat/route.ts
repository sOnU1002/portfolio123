
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Your API logic here
    return NextResponse.json({ message: "Request received!", body });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "This is a GET request!" });
}
