import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsStart } from "../Reducers/post.reducer";
import { selectPostList, selectPostLoading } from "../Selectors/post.selector";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 500 },
];

export default function PostsPage() {
  const dispatch = useDispatch();
  const rows = useSelector(selectPostList);
  const loading = useSelector(selectPostLoading);

  useEffect(() => {
    dispatch(fetchPostsStart());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Posts</Typography>
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
    </Container>
  );
}
