import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Header } from '../components/header';
import { Post } from '../components/post';
import { NewPost } from '../components/new-post';
import { DefaultMessage } from '../components/default-message';
import { Profile } from '../components/profile';

export function Home({ profile, myUser }) {
  const [searchParams,] = useSearchParams();
  const urlFilter = searchParams.get('posts') ?? '';

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['get-posts', urlFilter],
    queryFn: async () => {
      const usersData = await fetch(`http://localhost:3333/users`);
      const postsData = await fetch(`http://localhost:3333/posts`);
      const users = await usersData.json();
      const posts = await postsData.json();

      const me = users.find((user) => user.id === myUser.id);

      const filteredPosts = urlFilter === 'following' ? posts.filter((post) => me?.following.includes(post.user_id)) : posts
      return filteredPosts.reverse();
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
    <div className='relative py-10'>
      <Header />

      <main className='max-w-2xl mx-auto space-y-5'>
        <NewPost author={myUser} />

        <hr />

        {
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              author={myUser}
            />
          ))
        }
      </main>

      {profile ? <Profile open={profile} myUser={myUser} /> : null}
    </div>
  )
}
