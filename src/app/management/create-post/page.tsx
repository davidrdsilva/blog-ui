"use client";

import { Link, RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  Badge,
  FileInput,
  Switch,
  TagsInput,
  Textarea,
  TextInput
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { CSSProperties, useState } from "react";

const initialContent =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

const containerStyle: CSSProperties = {
  margin: "auto",
  marginTop: 20,
  maxWidth: "50%",
  padding: 10,
  borderRadius: 10,
};

export default function TextEditor() {
  // State to store the editor's content
  const [editorContent, setEditorContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Update the state with the editor's current HTML content
      setEditorContent(editor.getHTML());
    },
  });

  return (
    <div style={containerStyle}>
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
        description="The enabled, the post will be saved as a draft"
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

      {/* Display the current content of the editor */}
      <div style={{ marginTop: 20 }}>
        <Badge color="orange" variant="light">
          Preview content
        </Badge>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
}
