import faq from "server/services/faq";

const FaqTwoPage = () => {
   const posts = faq.getFaqList();
 
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.faqId}>{post.question}</li>
      ))}
    </ul>
  )
}

export default FaqTwoPage;