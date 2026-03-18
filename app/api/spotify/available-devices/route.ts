import { NextResponse } from 'next/server';
import { getAvailableDevices } from '@/services/spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const response = await getAvailableDevices();

        return NextResponse.json(response?.data ?? [], {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
            },
        });
    } catch (error) {
        console.error('Spotify available devices error:', error);

        return NextResponse.json(
            [],
            {
                status: 200,
                headers: { 'Cache-Control': 'public, s-maxage=3600' },
            }
        );
    }
}