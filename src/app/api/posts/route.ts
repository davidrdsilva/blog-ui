import { Post } from '@/shared/types/post.type';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Make request to local Ollama API
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gemma2:2b',
                prompt: `Generate a list of 3 mock blog posts as a valid JSON array. Each blog post should have the following structure:
                        {
                            id: 'unique_id',
                            createdAt: '2021-01-01T00:00:00Z',
                            image: 'http://192.168.255.107:9000/temp/6107.jpg',
                            author: {
                                id: 'unique_user_id',
                                firstName: 'Jane',
                                lastName: 'Collins',
                                image: 'http://192.168.255.107:9000/temp/6107.jpg',
                            },
                            title: 'Hexagonal architecture',
                            description:
                                'The hexagonal architecture, also known as the ports and adapters architecture, is an architectural pattern used in software design.',
                            tags: ['hexagonal architecture'],
                        }

                        Return only valid JSON with no additional text or explanation.`,
                stream: false,
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Ollama API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Extract the generated JSON string from Ollama's response
        const generatedText = data.response;

        // Find the JSON part of the response (in case Ollama adds any extra text)
        const jsonMatch = generatedText.match(/\[[\s\S]*\]/);

        if (!jsonMatch) {
            throw new Error('Could not extract valid JSON from Ollama response');
        }

        // Parse the JSON
        const blogPosts: Post[] = JSON.parse(jsonMatch[0]);

        // Ensure we have valid blog posts with all required fields
        const validatedPosts = blogPosts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            image: post.image,
            author: post.author,
            createdAt: post.createdAt,
            tags: post.tags,
        }));

        return NextResponse.json({ posts: validatedPosts });
    } catch (error) {
        console.error('Error generating blog posts:', error);
        return NextResponse.json(
            { error: 'Failed to generate blog posts', details: (error as Error).message },
            { status: 500 },
        );
    }
}
