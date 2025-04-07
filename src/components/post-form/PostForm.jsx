import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteImage, UploadFile } from "../Cloudinary";
import { IoMdSend } from "react-icons/io";
import { generateText } from "../../conf/ai";
import { markdownToText } from "../../conf/markdownToText";

export default function PostForm({ post }) {
  const [inputValue, setInputValue] = useState("");
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await UploadFile(data.image[0]) : null;
      //   console.log("file", file);

      if (file) {
        DeleteImage(post.imagePiblicId);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.secure_url : undefined,
        imagePiblicId: file ? file.public_id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await UploadFile(data.image[0]);

      if (file) {
        const fileUrl = file.secure_url;
        data.featuredImage = fileUrl;
        data.imagePiblicId = file.public_id;

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: fileUrl,
          status: data.status,
          userId: userData.$id,
          imagePiblicId: file.public_id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const aiInputSubmitHandler = async () => {
    try {
      const markdownText = await generateText(inputValue);
      const plaintext = markdownToText(markdownText);
      if (plaintext) {
        setValue("content", getValues("content") + plaintext);
        setInputValue("");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex text-white flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>

        <div className="mt-10 ">
          <h1 className="text-lg font-medium mb-2">Write with AI</h1>
          <div className="flex border-2 border-gray-500 shadow-2xl bg-gray-600 rounded-xl">
            <input
              className="w-full text-lg px-2 h-10 outline-none bg-none focus:bg-none border-none"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={aiInputSubmitHandler} bgColor="bg-gray-800">
              <IoMdSend />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
