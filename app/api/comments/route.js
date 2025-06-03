import {comments} from "../mockData";

export async function GET(req) {
  const {searchParams} = new URL(req.url);
  const productId = searchParams.get("productId");
  const productComments = comments.filter((c) => c.productId === productId);
  return new Response(JSON.stringify(productComments), {status: 200});
}

export async function POST(req) {
  const newComment = await req.json();
  newComment.id = Date.now().toString();
  newComment.timestamp = new Date().toISOString();
  comments.push(newComment);
  return new Response(JSON.stringify(newComment), {status: 201});
}
