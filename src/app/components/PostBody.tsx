import React from "react";

interface PostContentProps {
  content: string;
}

const PostBody = React.memo(({ content }: PostContentProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="custom-html-content"
    />
  );
});

PostBody.displayName = "PostBody";

export default PostBody;
