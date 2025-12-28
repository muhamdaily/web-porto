import { NextResponse } from "next/server";
import { getMonkeytypeData } from "@/services/monkeytype";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const GET = async () => {
  try {
    const response = await getMonkeytypeData();

    if (response.status >= 400 || !response.data) {
      return NextResponse.json(
        { message: "Failed to fetch Monkeytype data" },
        { status: response.status || 500 },
      );
    }

    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};