import {products} from "../mockData";

export async function GET() {
  return new Response(JSON.stringify(products), {status: 200});
}

export async function POST(req) {
  const newProduct = await req.json();
  newProduct.id = Date.now().toString();
  newProduct.upvotes = 0;
  newProduct.comments = [];
  products.push(newProduct);
  return new Response(JSON.stringify(newProduct), {status: 201});
}
