import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Header } from './components/header';
import { Post } from './components/post';
import { NewPost } from './components/new-post';
import { DefaultMessage } from './components/default-message';

export function App() {
  const [searchParams,] = useSearchParams();
  const urlFilter = searchParams.get('posts') ?? '';

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['get-users', urlFilter],
    queryFn: async () => {
      const usersData = await fetch(`http://localhost:3333/users`);
      const postsData = await fetch(`http://localhost:3333/posts`);
      const users = await usersData.json();
      const posts = await postsData.json();

      const myUser = users?.find((user) => user.username === 'me');

      return urlFilter === 'following'
        ? posts.filter((post) => myUser.following.includes(post.user_id)).reverse()
        : posts.reverse();
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60
  });

  if (isError) {
    return (
      <DefaultMessage message="Something went wrong, Try again" />
    );
  }

  if (isLoading) {
    return (
      <DefaultMessage message="Loading..." />
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
