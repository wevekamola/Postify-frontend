import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsStart } from "../Reducers/post.reducer";
import { fetchUserMetaStart } from "../Reducers/auth.reducer";
import { selectPostList, selectPostLoading} from "../Selectors/post.selector";
import { selectUserMeta, selectCurrentUser } from "../Selectors/auth.selector";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { categorizePosts } from "../utils/postUtils";

export default function PostsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectPostLoading);

  const allPosts = useSelector(selectPostList);
  const currentUser = useSelector(selectCurrentUser);
  const userMeta = useSelector(selectUserMeta);

  useEffect(() => {
    dispatch(fetchPostsStart());
  }, [dispatch]);

  useEffect(() => {
    if (userMeta.length === 0) {
      dispatch(fetchUserMetaStart());
    }
  }, [userMeta.length, dispatch]);

  const { otherPosts } = categorizePosts(allPosts, userMeta, currentUser?.id);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userName", headerName: "User Name", width: 200 },
    { field: "userEmail", headerName: "EmailID", width: 250 },
    { field: "body", headerName: "Post", width: 600 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/posts/${params.row.id}`)}
        >
          View
        </Button>
      ),
    },
  ];
  
  return (
    <Container style={{maxWidth: "90%" }}>
      <Typography variant="h4" sx={{ mt:5, mb:2, cursor: "pointer", fontWeight: 400 }} gutterBottom>
        All Posts
      </Typography>

      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={otherPosts}
          columns={columns}
          pageSize={10}
          loading={loading}
          disableSelectionOnClick
          getRowId={(row) => row.id}
        />
      </div>
    </Container>
  );
}
