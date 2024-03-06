import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from 'components/button';
import { cn } from 'lib/utils';

export function NewPost({ className, author }) {
  const [text, setText] = useState('');
  const canCreatePost = author.posts_count < 5;

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ post }) => {
      await fetch('http://localhost:3333/posts', {
        method: 'POST',
        body: JSON.stringify({
          username: author.username,
          user_id: author.id,
          post,
          type: 'post',
        }),
      });

      await fetch(`http://localhost:3333/users/${author.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          posts_count: author.posts_count + 1,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-posts'],
      });
    },
  });

  function handleCreatePost() {
    mutateAsync({ post: text });
  }

  return (
    <div className={cn('bg-zinc-800 p-8 rounded-md', className)}>
      <textarea
        placeholder='What`s happening?'
        className='bg-zinc-500 text-white px-4 py-1 w-full h-[100px] rounded-md'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!canCreatePost}
        maxLength={777}
      />
      <p className='text-sm text-slate-500'>
        {777 - text.length} characters left
      </p>
      {!canCreatePost ? (
        <p className='my-2 text-sm'>You reached your posts limit for today!</p>
      ) : null}

      <Button
        onClick={handleCreatePost}
        className='float-right'
        disabled={!canCreatePost}
      >
        <p>Post</p>
      </Button>
    </div>
  );
}
