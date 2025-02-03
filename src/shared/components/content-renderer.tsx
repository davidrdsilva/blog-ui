import React from "react";
import {
  Title,
  Text,
  Blockquote,
  List,
  Divider,
  Code,
  Anchor,
} from "@mantine/core";
import { JSONContent } from "@tiptap/react";
import { Lora } from "next/font/google";

const loraFont = Lora({
  weight: "400",
  subsets: ["latin"],
});

const renderContent = (node: JSONContent, paragraphFont = loraFont) => {
  if (!node) return null;

  switch (node.type) {
    case "doc":
      return node.content?.map((child, index) => (
        <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
      ));

    case "heading":
      return (
        <Title order={node.attrs?.level}>
          {node.content?.map((child, index) => (
            <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
          ))}
        </Title>
      );

    case "paragraph":
      return (
        <Text
          my={6}
          className={paragraphFont.className}
          style={{
            lineHeight: "1.6",
            fontSize: "1.125rem",
          }}
        >
          {node.content?.map((child, index) => (
            <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
          ))}
        </Text>
      );

    case "blockquote":
      return (
        <Blockquote>
          {node.content?.map((child, index) => (
            <React.Fragment key={index}>{renderContent(child)}</React.Fragment>
          ))}
        </Blockquote>
      );

    case "bulletList":
      return (
        <List withPadding>
          {node.content?.map((child, index) => (
            <List.Item key={index}>
              {child.content?.map((grandChild, grandIndex) => (
                <React.Fragment key={grandIndex}>
                  {renderContent(grandChild)}
                </React.Fragment>
              ))}
            </List.Item>
          ))}
        </List>
      );

    case "orderedList":
      return (
        <List type="ordered" withPadding>
          {node.content?.map((child, index) => (
            <List.Item key={index}>
              {child.content?.map((grandChild, grandIndex) => (
                <React.Fragment key={grandIndex}>
                  {renderContent(grandChild)}
                </React.Fragment>
              ))}
            </List.Item>
          ))}
        </List>
      );

    case "horizontalRule":
      return <Divider my="sm" />;

    case "text":
      let textElement: React.ReactNode = node.text;

      if (node.marks) {
        node.marks.forEach((mark) => {
          switch (mark.type) {
            case "bold":
              textElement = <strong>{textElement}</strong>;
              break;
            case "italic":
              textElement = <em>{textElement}</em>;
              break;
            case "strike":
              textElement = <s>{textElement}</s>;
              break;
            case "code":
              textElement = <Code>{textElement}</Code>;
              break;
            case "link":
              textElement = (
                <Anchor
                  href={mark.attrs?.href}
                  target={mark.attrs?.target}
                  rel={mark.attrs?.rel}
                >
                  {textElement}
                </Anchor>
              );
              break;
            default:
              break;
          }
        });
      }

      return textElement;

    default:
      return null;
  }
};

const TiptapRenderer = ({ content }: { content: JSONContent }) => {
  return <div>{renderContent(content)}</div>;
};

export default TiptapRenderer;
