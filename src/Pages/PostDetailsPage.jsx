import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPostList } from "../Selectors/post.selector";
import {
  selectCommentsByPostId,
  selectCommentsLoading,
} from "../Selectors/comment.selector";
import { fetchCommentsStart } from "../Reducers/comment.reducer";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { deepPurple, deepOrange, teal } from "@mui/material/colors";

export default function PostDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const postId = parseInt(id);

  const posts = useSelector(selectPostList);
  const users = useSelector((state) => state.auth.users);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const post = posts.find((p) => p.id === postId);
  const comments = useSelector((state) => selectCommentsByPostId(state, postId));
  const loading = useSelector(selectCommentsLoading);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (postId) {
      dispatch(fetchCommentsStart(postId));
    }
  }, [postId, dispatch]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  if (!post) return <Typography>Post not found</Typography>;

  const author = users.find((u) => u.id === post.userId);
  const isOwner = currentUser?.id === post.userId;
  const avatarColors = [deepPurple[500], deepOrange[500], teal[500]];

  const handleUpdate = () => {
    // For demo: simulate update and show snackbar
    setUpdateSuccess(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Post Details */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Post #{post.id}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Posted by: {author?.email || "N/A"}
        </Typography>
        <Divider sx={{ my: 2 }} />

        {isOwner ? (
          <>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Body"
              multiline
              rows={4}
              fullWidth
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Box mt={2}>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6">Title</Typography>
            <Typography paragraph>{post.title}</Typography>
            <Typography variant="h6">Body</Typography>
            <Typography paragraph>{post.body}</Typography>
          </>
        )}
      </Paper>

      {/* Comments Section */}
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : comments.length === 0 ? (
          <Typography>No comments found.</Typography>
        ) : (
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start" divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: avatarColors[comment.id % avatarColors.length],
                    }}
                  >
                    {comment.email?.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {comment.email}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {comment.name}
                      </Typography>
                    </>
                  }
                  secondary={comment.body}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar
        open={updateSuccess}
        autoHideDuration={3000}
        onClose={() => setUpdateSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setUpdateSuccess(false)}>
          Post updated (simulated)!
        </Alert>
      </Snackbar>
    </Container>
  );
}
