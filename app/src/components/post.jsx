export function Post({ post }) {
  return (
    <div className='bg-zinc-800 p-8 rounded-md'>
      <h2 className='mb-4'>{post.username}</h2>
      <h3>{post.post}</h3>
    </div>
  );
};