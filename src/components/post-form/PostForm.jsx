import { useCallback, useEffect } from "react";
import services from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Button, RTE, Select } from "../index";
/* eslint-disable react/prop-types */
export default function PostForm({ post }) {
  const { register, handleSubmit, watch, control, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "Active",
      },
    });
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const submitPost = async (data) => {
    console.log("Post submitting data", data);
    if (post) {
      //Update Post
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;

      //deleting existing image file
      if (file) {
        await services.deleteFile(post.featuredImage);
      }

      //updating existing post in db
      const dbPost = await services.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      //uploading file
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;

      if (file) {
        //adding new post in db
        data.featuredImage = file.$id;
        const dbPost = await services.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransformer = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscribe = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransformer(value.title));
      }
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, [setValue, slugTransformer, watch]);

  return (
    <form onSubmit={handleSubmit(submitPost)}>
      <div className="w-2/3">
        <Input
          label="title"
          placeholder="Title"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          label="Slug"
          placeholder="slug"
          onInput={(e) => setValue("slug", slugTransformer(e.target.value))}
          {...register("slug", {
            required: true,
          })}
        />

        <RTE
          control={control}
          label="Content: "
          defaultValue={getValues("content")}
          name="content"
        />
      </div>
      <div className="w-1/3">
        <Input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          label="image upload"
          placeholder="image upload"
          {...register("image", {
            required: !post,
          })}
        />

        {post && (
          <div>
            <img
              src={services.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}

        <Select
          options={["Active", "Inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />

        <Button type="submit">{post ? "Update" : "Submit"}</Button>
      </div>
    </form>
  );
}
