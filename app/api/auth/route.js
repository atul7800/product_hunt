export async function POST(req) {
  const {username, password} = await req.json();
  if (username && password) {
    // Mock user
    return new Response(JSON.stringify({username, token: "mock-jwt-token"}), {
      status: 200,
    });
  }
  return new Response(JSON.stringify({error: "Invalid credentials"}), {
    status: 401,
  });
}
