import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsStart,
  deletePostStart,
  clearDeletedId,
} from "../Reducers/post.reducer";
import {
  selectPostList,
  selectPostLoading,
  selectDeletedId,
} from "../Selectors/post.selector";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function PostsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectPostLoading);
  const deletedId = useSelector(selectDeletedId);

  const allPosts = useSelector(selectPostList);
  const users = useSelector((state) => state.auth.users);

  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchPostsStart());
  }, [dispatch]);

  useEffect(() => {
    if (deletedId !== null) {
      setSnackbarOpen(true);
    }
  }, [deletedId]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(clearDeletedId());
  };

  const rows = allPosts.map((post) => {
    const user = users.find((u) => u.id === post.userId);
    return {
      ...post,
      userName: user?.name || "N/A",
      userEmail: user?.email || "N/A",
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userName", headerName: "User Name", width: 200 },
    { field: "userEmail", headerName: "User Email", width: 250 },
    { field: "body", headerName: "Post", width: 500 },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/posts/${params.row.id}`)}
            sx={{ mr: 1 }}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => dispatch(deletePostStart(params.row.id))}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Create Post
      </Button>

      <PostForm open={open} handleClose={() => setOpen(false)} />

      <Typography variant="h4" gutterBottom>
        All Posts
      </Typography>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          loading={loading}
          disableSelectionOnClick
          getRowId={(row) => row.id}
        />
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSnackbarClose}
        >
          Post #{deletedId} deleted successfully
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
