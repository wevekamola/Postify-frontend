import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostList } from "../Selectors/post.selector";
import { Container, Typography } from "@mui/material";

export default function PostDetailsPage() {
  const { id } = useParams();
  const posts = useSelector(selectPostList);
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Post #{post.id}</Typography>
      <Typography variant="h6" gutterBottom>Title:</Typography>
      <Typography paragraph>{post.title}</Typography>
      <Typography variant="h6" gutterBottom>Body:</Typography>
      <Typography paragraph>{post.body}</Typography>
    </Container>
  );
}