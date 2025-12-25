import { NextResponse } from "next/server";

export async function GET() {
  // Return the public token from server-side env vars
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 
                process.env.MAPBOX_ACCESS_TOKEN || "";
  
  return NextResponse.json({ token });
}
