import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosts,
  getPostStatus,
  getPostsError,
  fetchPosts,
} from "../redux/features/posts/postsSice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import User from "./user";
import { Link } from "react-router-dom";

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector(getAllPosts);
  const status = useSelector(getPostStatus);
  const erro = useSelector(getPostsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const showRecentsPostsFirst = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section>
      {status === "pending" ? (
        <p className="loading"></p>
      ) : status === "succeeded" ? (
        <section className="animeLeft">
          {showRecentsPostsFirst.map((post, index) => (
            <article key={index}>
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 100)}</p>
              <p className="postCredit">
                <Link to={`post/${post.id}`}>View Post</Link>{" "}
                <User authorId={post.id} />
                <TimeAgo timestamp={post.date} />
              </p>
              <ReactionButtons post={post} />
            </article>
          ))}
        </section>
      ) : (
        <p>{erro}</p>
      )}
    </section>
  );
}

export default Posts;
