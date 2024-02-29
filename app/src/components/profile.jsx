import { useState, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, UserRoundCheck, UserRoundX } from 'lucide-react';

import { DefaultMessage } from "./default-message";
import { NewPost } from './new-post';
import { Post } from './post';
import { Button } from './button';

export function Profile({ open = false, myUser }) {
  if (!open) {
    return null
  }

  const [follow, setFollow] = useState(false);

  const navigate = useNavigate();

  const modalRef = useRef(null);

  const params = useParams();
  const userId = params.user_id || ''

  const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useQuery({
    queryKey: ['get-users-profile', userId],
    queryFn: async () => {
      const usersData = await fetch(`http://localhost:3333/users`);
      const users = await usersData.json();

      const data = {
        me: users.find((user) => user.id === myUser.id),
        userProfile: users.find((user) => user.id === userId)
      };

      if (data.me.following.includes(data.userProfile.id)) {
        setFollow(true)
      } else {
        setFollow(false)
      }

      return data
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60
  });

  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useQuery({
    queryKey: ['get-posts'],
    queryFn: async () => {
      const postsData = await fetch(`http://localhost:3333/posts?user_id=${userId}`);
      const posts = await postsData.json();

      return posts.reverse();
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60
  });

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async ({ follow }) => {
      const newMe = {
        following: follow ? user.me.following.filter((id) => id !== user.userProfile.id) : [...user.me.following, user.userProfile.id],
        following_count: follow ? user.me.following_count - 1 : user.me.following_count + 1
      };

      const newUserProfile = {
        followers: follow ? user.userProfile.followers.filter((id) => id !== user.me.id) : [...user.userProfile.followers, user.me.id],
        followers_count: follow ? user.userProfile.followers_count - 1 : user.userProfile.followers_count + 1
      }

      await fetch(`http://localhost:3333/users/${user.me.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newMe),
      });

      await fetch(`http://localhost:3333/users/${user.userProfile.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newUserProfile),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-users-profile']
      })
    }
  });

  function handleFollow() {
    mutateAsync({ follow })
  };

  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      navigate('/');
    }
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-zinc-800 p-8 rounded-md"
      onClick={handleClickOutside}
    >
      <div
        className='bg-zinc-700 p-8 rounded-md w-[500px] m-auto mt-10 antialiased shadow-2xl'
        ref={modalRef}
      >
        {
          isErrorUser || isLoadingUser ? (
            <DefaultMessage message={isErrorUser ? "Something went wrong, Try again" : "Loading..."} />
          ) : (
            <div>
              <Button onClick={handleFollow}>
                <div className='flex items-center'>
                  {
                    follow
                      ? (
                        <>
                          <UserRoundX  size={14} className='mr-2'/>
                          <p>Unfollow</p>
                        </>
                      ) :(
                        <>
                          <UserRoundCheck  size={14} className='mr-2'/>
                          <p>Follow</p>
                        </>
                      )
                  }
                </div>
              </Button>

              <div className='flex justify-between mb-10'>
                <div>
                  <p className='text-slate-400'>Username</p>
                  <p className='text-xl'>{user.userProfile.username}</p>
                </div>

                <div>
                  <p className='text-slate-400'>Date joined Posterr</p>
                  <p className='text-xl'>{user.userProfile.date_joined}</p>
                </div>
              </div>

              <div className='flex justify-around'>
                <div className='flex flex-col items-center'>
                  <p className='text-slate-400'>Followers</p>
                  <p className='text-xl'>{user.userProfile.followers_count}</p>
                </div>

                <div className='flex flex-col items-center'>
                  <p className='text-slate-400'>Following</p>
                  <p className='text-xl'>{user.userProfile.following_count}</p>
                </div>

                <div className='flex flex-col items-center'>
                  <p className='text-slate-400'>Posts</p>
                  {
                    isLoadingPosts
                      ? <Loader2 className='animate-spin' />
                      : <p className='text-xl'>{posts.length}</p>
                  }
                </div>
              </div>

              <hr className='my-10'/>

              <div className='mb-10'>
                  <NewPost author={user.userProfile} />

                  {
                    posts?.map((post) => (
                      <Post
                        key={post.id}
                        post={post}
                        className='my-2'
                      />
                    ))
                  }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};