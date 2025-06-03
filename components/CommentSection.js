"use client";
import {useAuth} from "./AuthContext";
import {useState, useEffect} from "react";
import {Input} from "./ui/input";
import {Button} from "./ui/button";

export function CommentSection({productId}) {
  const {user} = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/api/comments?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [productId]);

  const handleComment = async () => {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({productId, text, username: user.username}),
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setText("");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold">Comments</h3>
      {comments.map((c) => (
        <div key={c.id} className="border p-2 my-2">
          <p>{c.text}</p>
          <small>
            {c.username} - {new Date(c.timestamp).toLocaleString()}
          </small>
        </div>
      ))}
      {user && (
        <div className="mt-2 flex gap-2">
          <Input
            placeholder="Add comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleComment}>Post</Button>
        </div>
      )}
    </div>
  );
}
