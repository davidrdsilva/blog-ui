"use client";

import {
  Badge,
  FileInput,
  Switch,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

// Import styles
import "@mantine/tiptap/styles.css";
import classes from "./modules/page.module.css";

const initialContent: JSONContent = {
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

export default function TextEditor() {
  // State to store the editor's content in JSON format
  const [editorContent, setEditorContent] = useState(initialContent);

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
      <TextInput label="Post title" radius="md" />

      <Textarea
        radius="md"
        label="Description"
        description="Short description of the post"
        placeholder="Enter post description"
        autosize
        minRows={2}
        maxRows={6}
        style={{ marginTop: 20 }}
      />

      <TagsInput
        label="Tags"
        placeholder="Write a tag and press enter"
        style={{ marginTop: 20 }}
      />

      <FileInput
        label="Post image"
        placeholder="Select the image of the post"
        style={{ marginTop: 20 }}
      />

      <Switch
        label="Mark as draft"
        description="If enabled, the post will be saved as a draft"
        style={{ marginTop: 20 }}
      />

      <RichTextEditor
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

      {/* Display the current JSON content of the editor */}
      <div style={{ marginTop: 20 }}>
        <Badge color="orange" variant="light">
          Preview JSON Content
        </Badge>
        <pre
          style={{
            background: "black",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "10px",
            overflowX: "scroll",
          }}
        >
          {JSON.stringify(editorContent, null, 2)}
        </pre>
      </div>
    </div>
  );
}
