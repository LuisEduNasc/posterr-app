import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Header } from './components/header';
import { Post } from './components/post';
import { NewPost } from './components/new-post';

export function App() {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['get-posts'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3333/posts`);
      const data = await res.json();

      return data.reverse();
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60
  });

  if (isError) {
    return (
      <p>Something went wrong, Try again</p>
    );
  }

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className='py-10 space-y-8'>
      <Header />

      <main className='max-w-2xl mx-auto space-y-5'>
        <NewPost />

        <hr />

        {
          posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))
        }
      </main>
    </div>
  )
}
