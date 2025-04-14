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
  const rows = useSelector(selectPostList);
  const loading = useSelector(selectPostLoading);
  const deletedId = useSelector(selectDeletedId);

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

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
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
        Posts
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
