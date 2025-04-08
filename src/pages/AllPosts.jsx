import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8 bg-[#030712] rounded-2xl my-4">
      <Container>
        <div className="w-full flex-col sm:flex-row sm:flex sm:gap-5">
          {posts.map((post) => (
            <div key={post.$id} className="max-w-96 min-w-60 my-5">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
