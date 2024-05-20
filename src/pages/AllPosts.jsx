import { useState } from "react";
import services from "../appwrite/config";
import { PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  services.getPosts().then((allPosts) => setPosts(allPosts));
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

export default AllPosts;
