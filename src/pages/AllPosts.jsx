import { useEffect, useState } from "react";
import services from "../appwrite/config";
import { PostCard } from "../components";

function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    services.getPosts().then((allPosts) => {
      setPosts(allPosts.documents);
    });
  }, []);
  return (
    <div>
      {posts?.map((post) => (
        <div key={post.$id}>
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
}

export default AllPostsPage;
