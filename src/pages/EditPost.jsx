import { useEffect, useState } from "react";
import { PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/config";

function EditPostPage() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((postItem) => {
        if (postItem) setPost(postItem);
      });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);

  if (!post) return;

  return (
    <div>
      <PostForm post={post} />
    </div>
  );
}

export default EditPostPage;
