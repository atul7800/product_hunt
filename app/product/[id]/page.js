"use client";
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {useAuth} from "@/components/AuthContext";
import {Button} from "@/components/ui/button";
import {CommentSection} from "@/components/CommentSection";

export default function ProductDetailPage() {
  const {id} = useParams();
  const {user} = useAuth();
  const [product, setProduct] = useState(null);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === id);
        setProduct(found);
      });
  }, [id]);

  const handleUpvote = async () => {
    if (!user) return alert("Login first!");

    const res = await fetch("/api/upvotes", {
      method: "POST",
      body: JSON.stringify({productId: id, username: user.username}),
    });
    if (res.ok) {
      const {product: updatedProduct, hasUpvoted: updatedToggle} =
        await res.json();
      setProduct(updatedProduct);
      setHasUpvoted(updatedToggle);
    }

    console.log("Upvote function called : ", new Date());
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.tagline}</p>
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-md object-cover my-4"
      />
      <p>{product.description}</p>
      <a href={product.website} className="text-blue-500" target="_blank">
        Visit Website
      </a>
      <p className="mt-2 text-sm">Submitted by: {product.submittedBy}</p>
      <div className="mt-4 flex items-center gap-2">
        <Button onClick={handleUpvote}>
          {hasUpvoted ? "Unvote" : "Upvote"}
        </Button>
        <p>{product.upvotes} upvotes</p>
      </div>
      <CommentSection productId={product.id} />
    </div>
  );
}
