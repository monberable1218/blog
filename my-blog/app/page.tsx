import { getAllPosts, type TypePost } from "@/lib/posts";



// export const getStaticProps = () => {
//   const posts = getAllPosts();
//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default function Page() {
  const posts: TypePost[] = getAllPosts();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-4">ブログ一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="border-b py-2">
            <a href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              {post.title}
            </a>
						<p className="text-gray-500 text-sm">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
