import { Post } from '@/shared/types/post.type';
import { JSONContent } from '@tiptap/react';

export const initialContent: JSONContent = {
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Welcome to Mantine rich text editor' }],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'RichTextEditor component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. ',
                },
                { type: 'text', marks: [{ type: 'code' }], text: 'RichTextEditor' },
                { type: 'text', text: ' is based on ' },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'link',
                            attrs: {
                                href: 'https://tiptap.dev/',
                                target: '_blank',
                                rel: 'noopener noreferrer',
                            },
                        },
                    ],
                    text: 'Tiptap.dev',
                },
                { type: 'text', text: ' and supports all of its features:' },
            ],
        },
    ],
};

export const postMock: Post = {
    id: 'sdjdjfkdfn',
    createdAt: '2021-01-01T00:00:00Z',
    image: 'http://192.168.255.107:9000/temp/IMG_0489.jpg',
    author: {
        id: 'dvddfvdfvf',
        firstName: 'Jane',
        lastName: 'Collins',
        image: 'http://192.168.255.107:9000/temp/IMG_0420.jpg',
    },
    title: 'Hexagonal architecture',
    description:
        'The hexagonal architecture, also known as the ports and adapters architecture, is an architectural pattern used in software design. It aims at creating loosely coupled application components that can be easily connected to their software environment by means of ports and adapters.',
    body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"The "},{"type":"text","marks":[{"type":"bold"}],"text":"hexagonal architecture"},{"type":"text","text":", or "},{"type":"text","marks":[{"type":"bold"}],"text":"ports and adapters architecture"},{"type":"text","text":", is an architectural pattern used in "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/Software_design","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"software design"},{"type":"text","text":". It aims at creating "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/Loose_coupling","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"loosely coupled"},{"type":"text","text":" application components that can be easily connected to their software environment by means of ports and "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/Adapter_pattern","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"adapters"},{"type":"text","text":". This makes components exchangeable at any level and facilitates test automation."}]},{"type":"paragraph","content":[{"type":"text","text":"The hexagonal architecture was invented by "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/Alistair_Cockburn","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"Alistair Cockburn"},{"type":"text","text":" in an attempt to avoid known structural pitfalls in "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/Object-oriented_analysis_and_design","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"object-oriented software design"},{"type":"text","text":", such as undesired dependencies between "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/Layer_(object-oriented_design)","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"layers"},{"type":"text","text":" and contamination of "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/User_interface","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"user interface"},{"type":"text","text":" code with "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://en.wikipedia.org/wiki/Business_logic","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"business logic"},{"type":"text","text":"."}]}]}',
    tags: ['hexagonal architecture', 'adapters', 'architectural pattern', 'software design'],
};

export const postsMock: Post[] = [
    {
        id: 'sdjdjfkdfn',
        createdAt: '2021-01-01T00:00:00Z',
        image: 'http://192.168.255.107:9000/temp/IMG_0489.jpg',
        author: {
            id: 'dvddfvdfvf',
            firstName: 'Jane',
            lastName: 'Collins',
            image: 'http://192.168.255.107:9000/temp/IMG_0420.jpg',
        },
        title: 'Hexagonal architecture',
        description:
            'The hexagonal architecture, also known as the ports and adapters architecture, is an architectural pattern used in software design.',
        tags: ['hexagonal architecture'],
    },
    {
        id: 'dxxdgfhfdhf',
        createdAt: '2021-01-11T00:00:00Z',
        image: 'http://192.168.255.107:9000/temp/ComfyUI_00089_.jpg',
        author: {
            id: 'vbcvnbnbnmvbmvb',
            firstName: 'Leah',
            lastName: 'Hamms',
            image: 'http://192.168.255.107:9000/temp/ComfyUI_00048_.jpg',
        },
        title: 'Loose coupling',
        description:
            'Components in a loosely coupled system can be replaced with alternative implementations that provide the same services.',
        tags: ['loosely coupled'],
    },
];
