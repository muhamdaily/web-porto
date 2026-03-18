import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/services/spotify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const response = await getNowPlaying();

        return NextResponse.json(response?.data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
            },
        });
    } catch (error) {
        console.error('Spotify API error:', error);

        return NextResponse.json(
            { error: 'Failed to fetch now playing' },
            { status: 500 }
        );
    }
}