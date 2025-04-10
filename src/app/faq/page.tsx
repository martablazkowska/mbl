'use client';
import { useState, useEffect } from 'react'

const FaqPage = () => {
    const [posts, setPosts] = useState(null)
 
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/faq')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])
 
  if (!posts) return <div>Loading...</div>
 
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.faqId}>{post.question}</li>
      ))}
    </ul>
  )
}

export default FaqPage;