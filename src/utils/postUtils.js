export function categorizePosts(posts = [], users = [], currentUserId) {
    return posts.reduce(
      (acc, post) => {
        const user = users.find((u) => u.id === post.userId);
        const enrichedPost = {
          ...post,
          userName: user?.name || "N/A",
          userEmail: user?.email || "N/A",
        };
  
        if (post.userId === currentUserId) {
          acc.myPosts.push(enrichedPost);
        } else {
          acc.otherPosts.push(enrichedPost);
        }
  
        return acc;
      },
      { myPosts: [], otherPosts: [] }
    );
  }
  