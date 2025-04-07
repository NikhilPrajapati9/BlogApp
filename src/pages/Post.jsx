import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { DeleteImage } from "../components/Cloudinary";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        (async () => {
          await DeleteImage(post.featuredImage);
          navigate("/");
        })();
      }
    });
  };

  return post ? (
    <div className="py-8 bg-[#030712] text-white rounded-2xl my-5">
      <Container>
        <div className="w-full flex justify-center mb-4 rounded-xl p-2">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="rounded-xl max-w-120 outline-none "
          />
          <div className="w-full mb-6 text-start px-5">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
          {isAuthor && (
            <div className="flex">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor=""
                  className="mr-3 items-center flex h-10 cursor-pointer border-2 border-green-500 "
                >
                  Edit
                </Button>
              </Link>
              <Button
                className="h-10 items-center flex cursor-pointer border-2 border-red-500"
                bgColor=""
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
