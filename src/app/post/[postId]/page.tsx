'use client';

import BlogArticle from '@shared/components/blog-article';
import { postMock } from '../../../../mocks/data';

export default function BlogPage() {
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
