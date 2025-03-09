# Blog UI

## Getting Started

First, install the dependencies:

```bash
npm ci
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Running via Docker

Build the Docker image:

```bash
docker build -t blog-ui .
```

Once the image is properly set, run the container:

```bash
docker run --rm -p 3000:3000 blog-ui
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
