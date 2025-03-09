import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Get postId from URL query parameters
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('postId');

        // route to fetch post by ID from API
        return NextResponse.json({ post: `Here goes the post with ID ${postId}` });
    } catch (error) {
        console.error('Error generating blog posts:', error);
        return NextResponse.json(
            { error: 'Failed to generate blog posts', details: (error as Error).message },
            { status: 500 },
        );
    }
}
