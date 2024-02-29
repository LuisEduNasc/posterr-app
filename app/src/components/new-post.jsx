import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from './button';
import { cn } from '../../lib/utils';

export function NewPost({ className, myUser }) {
  const inputRef = useRef(null);

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async ({ post }) => {
      await fetch('http://localhost:3333/posts', {
        method: 'POST',
        body: JSON.stringify({
          username: myUser.username,
          user_id: myUser.id,
          post,
          type: 'post'
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-posts']
      })
    }
  });

  function handleCreatePost() {
    mutateAsync({ post: inputRef.current.value });
  };

  return (
    <div className={cn(
      'bg-zinc-800 p-8 rounded-md',
      className
    )}>
      <textarea
        placeholder='What`s happening?'
        className='bg-zinc-500 text-white px-4 py-1 w-full h-[100px] rounded-md'
        ref={inputRef}
      />

      <Button
        text='Post' onClick={handleCreatePost}
        className='float-right'
      />
    </div>
  );
};