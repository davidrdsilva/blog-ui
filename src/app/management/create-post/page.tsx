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
import "@mantine/tiptap/styles.css";
import TiptapRenderer from "@shared/components/content-renderer";
import classes from "@styles/create-post/styles.module.css";

// Mock
import { Post } from "@shared/types/post.type";
import { postMock } from "../../../../mocks/mock-data";

interface NotificationState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

export default function TextEditor() {
  // State for all form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [editorContent, setEditorContent] = useState<JSONContent>({});
  const [loading, setLoading] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: "success",
    message: "",
  });

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({
      show: true,
      type,
      message: message,
    });

    // Auto-hide notification after 5 seconds
    setTimeout(hideNotification, 5000);
  };

  const savePost = async () => {
    setLoading(true);
    try {
      // Create a new Post object with current values
      const newPost: Post = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        image: image ? URL.createObjectURL(image) : "",
        author: postMock.author,
        title,
        body: JSON.stringify(editorContent),
        tags,
        description,
      };

      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            title &&
            description &&
            image &&
            editorContent.content &&
            editorContent.content.length > 1
          ) {
            resolve(newPost);
          } else {
            reject(new Error("Title, description and image are required"));
          }
        }, 1000);
      });

      showNotification("success", "Post saved successfully");
    } catch (error) {
      showNotification(
        "error",
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again"
      );
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  const editor = useEditor({
    extensions: [StarterKit, Link],
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

      {/* Conditional rendering of notifications */}
      {notification.show && notification.type === "error" && (
        <Notification
          icon={<IconX size={20} />}
          mt="md"
          color="red"
          title="Error"
          onClose={hideNotification}
        >
          {notification.message}
        </Notification>
      )}

      {notification.show && notification.type === "success" && (
        <Notification
          icon={<IconCheck size={20} />}
          color="teal"
          title="Success"
          mt="md"
          onClose={hideNotification}
        >
          {notification.message}
        </Notification>
      )}

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
