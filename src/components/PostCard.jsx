/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import services from "../appwrite/config";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-20 rounded-lg ">
        <img src={services.getFilePreview(featuredImage)} alt={title} />
      </div>

      <h2 className="text-xl">{title}</h2>
    </Link>
  );
}
