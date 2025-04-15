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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (postId) dispatch(fetchCommentsStart(postId));
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

  const handleUpdate = () => setUpdateSuccess(true);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        gap={0}
        alignItems="flex-start"
      >
        {/* Post Section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            flex: 1,
            minWidth: 0,
            borderTopRightRadius:0,
            borderBottomRightRadius:0,
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 250,
              backgroundColor: "#111",
              borderRadius: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
              fontSize: "1.2rem",
            }}
          >
            Image Placeholder (500×250)
          </Box>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Posted by: {author?.email || "N/A"}
          </Typography>
          <Divider sx={{ my: 1 }} />

          {isOwner ? (
            <>
              <TextField
                label="Body"
                multiline
                rows={2}
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
              <Typography variant="h6">Body</Typography>
              <Typography paragraph>{post.body}</Typography>
            </>
          )}
        </Paper>

        {/* Comments Section */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            flex: 1,
            minWidth: 0,
            maxHeight: 500,
            borderTopLeftRadius:0,
            borderBottomLeftRadius:0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                        <Typography variant="subtitle1" sx={{fontWeight: 400 }}>
                          {comment.email}
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
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
      sx={{bottom:"20px"}}
        open={updateSuccess}
        autoHideDuration={4000}
        onClose={() => setUpdateSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity="success" onClose={() => setUpdateSuccess(false)}>
          Post updated succesfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
