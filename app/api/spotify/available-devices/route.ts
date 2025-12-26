import { NextResponse } from 'next/server';
import { getAvailableDevices } from '@/services/spotify';

export async function GET() {
    const response = await getAvailableDevices();

    return NextResponse.json(response?.data, {
        status: 200,
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
    });
}