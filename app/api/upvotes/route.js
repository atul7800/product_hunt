import {products, userUpvotes} from "../mockData";

export async function POST(req) {
  const {productId, username} = await req.json();

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return new Response(JSON.stringify({error: "Product not found"}), {
      status: 404,
    });
  }

  const key = `${username}-${productId}`;
  if (userUpvotes[key]) {
    // User already upvoted → unvote
    product.upvotes = Math.max(0, product.upvotes - 1);
    delete userUpvotes[key];
  } else {
    // User has not upvoted → upvote
    product.upvotes = (product.upvotes || 0) + 1;
    userUpvotes[key] = true;
  }

  return new Response(
    JSON.stringify({
      product,
      hasUpvoted: !!userUpvotes[key],
    }),
    {status: 200}
  );
}
