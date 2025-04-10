import faq from "server/services/faq";

export async function GET() {
  const posts = faq.getFaqList();

  return Response.json(posts);
}
