'use client';

import BlogArticle from '@shared/components/blog-article';
import { postMock } from '../../../../mocks/data';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function BlogPage() {
    const { postId } = useParams();

    useEffect(() => {
        async function fetchBlogPosts() {
            try {
                const response = await fetch(`/api/posts/by-id?postId=${postId}`);

                if (!response.ok) {
                    throw new Error(`Error fetching blog posts: ${response.status}`);
                }

                const data = await response.json();

                console.log('RETRIEVED POST:', data);
            } catch (err) {
                console.error('Failed to fetch blog posts:', err);
            } finally {
                // setLoading(false);
            }
        }

        fetchBlogPosts();
    }, []);

    return (
        <BlogArticle
            id={postMock.id}
            title={postMock.title}
            description={postMock.description}
            image={postMock.image}
            createdAt={postMock.createdAt}
            body={postMock.body}
            author={postMock.author}
            tags={postMock.tags}
        />
    );
}
