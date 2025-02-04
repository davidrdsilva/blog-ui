"use client";

import {
  Badge,
  Button,
  FileInput,
  Notification,
  Switch,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconCheck, IconX } from "@tabler/icons-react";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

// Import styles
import TiptapRenderer from "@/shared/components/content-renderer";
import "@mantine/tiptap/styles.css";
import classes from "./modules/page.module.css";

// Mock
import { postMock } from "../../../../mocks/mock-data";

const xIcon = <IconX size={20} />;
const checkIcon = <IconCheck size={20} />;

const initialContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Welcome to Mantine rich text editor" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "RichTextEditor component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. ",
        },
        { type: "text", marks: [{ type: "code" }], text: "RichTextEditor" },
        { type: "text", text: " is based on " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          ],
          text: "Tiptap.dev",
        },
        { type: "text", text: " and supports all of its features:" },
      ],
    },
  ],
};

type Author = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
};

type Post = {
  id: string;
  createdAt: string;
  image: string;
  author: Author;
  title: string;
  body: string;
  tags: string[];
};

export default function TextEditor() {
  // State for all form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [editorContent, setEditorContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const savePost = () => {
    setLoading(true);

    // Create a new Post object with current values
    const newPost: Post = {
      id: crypto.randomUUID(), // Generate a random ID
      createdAt: new Date().toISOString(),
      image: image ? URL.createObjectURL(image) : "", // Create URL for uploaded image
      author: postMock.author, // Using mock author data
      title: title,
      body: JSON.stringify(editorContent),
      tags: tags,
    };

    // Here you can handle the post data (e.g., send to API)
    console.log("Saving post:", newPost);

    setLoading(false);
  };

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Update the state with the editor's current JSON content
      setEditorContent(editor.getJSON());
    },
  });

  return (
    <div className={classes.container}>
      <TextInput
        name="post-title"
        label="Post title"
        radius="md"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />

      <Textarea
        name="description"
        radius="md"
        label="Description"
        description="Short description of the post"
        placeholder="Enter post description"
        autosize
        minRows={2}
        maxRows={6}
        style={{ marginTop: 20 }}
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
      />

      <TagsInput
        name="tags"
        label="Tags"
        placeholder="Write a tag and press enter"
        style={{ marginTop: 20 }}
        value={tags}
        onChange={setTags}
      />

      <FileInput
        name="image"
        label="Post image"
        placeholder="Select the image of the post"
        style={{ marginTop: 20 }}
        value={image}
        onChange={setImage}
      />

      <Switch
        name="draft-status"
        label="Mark as draft"
        description="If enabled, the post will be saved as a draft"
        style={{ marginTop: 20 }}
        checked={isDraft}
        onChange={(event) => setIsDraft(event.currentTarget.checked)}
      />

      <RichTextEditor
        id="text-editor"
        editor={editor}
        style={{
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      <Button
        variant="light"
        size="md"
        onClick={savePost}
        mt={20}
        loading={loading}
      >
        Save
      </Button>

      <Notification
        icon={xIcon}
        mt="md"
        color="red"
        title="Bummer!"
        withCloseButton={false}
      >
        Something went wrong
      </Notification>

      <Notification
        icon={checkIcon}
        color="teal"
        title="All good!"
        mt="md"
        withCloseButton={false}
      >
        Everything is fine
      </Notification>

      {/* Display the current JSON content of the editor */}
      <div style={{ marginTop: 20 }}>
        <Badge color="orange" variant="light">
          preview
        </Badge>
        <TiptapRenderer content={editorContent} />
      </div>
    </div>
  );
}
