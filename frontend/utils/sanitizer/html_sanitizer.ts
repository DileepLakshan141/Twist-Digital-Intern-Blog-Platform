import DOMPurify from "dompurify";

export const blogContentSanitizer = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "i",
      "sub",
      "sup",
      "em",
      "u",
      "underline",
      "h1",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
    ],
    ALLOWED_ATTR: ["href", "rel"],
  });
};
