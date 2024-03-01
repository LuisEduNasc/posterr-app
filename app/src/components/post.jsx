import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Repeat2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cn } from '../../lib/utils';
import { Button } from './button';

export function Post({ post, className, author }) {
  const [openComment, setOpenComment] = useState(false);
  const queryClient = useQueryClient();

  const inputRef = useRef(null);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ type }) => {
      await fetch('http://localhost:3333/posts', {
        method: 'POST',
        body: JSON.stringify({
          username: author.username,
          user_id: author.id,
          post: `${post.username} - ${post.post}`,
          ...(type === 'quote' && inputRef.current.value && { comment: inputRef.current.value}),
          type
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-posts']
      })
    }
  });

  function handleNewPost(type) {
    mutateAsync({ type });
    setOpenComment(false);
  };

  return (
    <div className={cn(
      'bg-zinc-800 p-8 rounded-md',
      className
    )}>
      <div className='flex justify-between mb-4'>
        <h2 className='text-slate-500'>
          <Link to={`/profile/${post.user_id}`}>
            {post.username}
          </Link>
        </h2>

        <p className='bg-slate-600 rounded-full px-4'>{post.type}</p>
      </div>

      <h3>{post.post}</h3>

      {
        post.comment
          ? (<p className='text-sm text-slate-400'>"{post.comment}"</p>)
          : null
      }

      {
        openComment ? (
          <div>
            <textarea
              placeholder='What`s happening?'
              className='bg-zinc-500 text-white px-4 py-1 w-full h-[100px] rounded-md mt-4'
              ref={inputRef}
            />

            <div className='flex justify-end'>
              <Button
                onClick={() => handleNewPost('quote')}
                className='float-right'
              >
                <p>Post</p>
              </Button>
            </div>
          </div>
        ) : null
      }

      <div className='flex justify-end mt-4'>
        <button title='Repost' onClick={() => handleNewPost('repost')}>
          <Repeat2 />
        </button>

        <button title='Quote' className='ml-4' onClick={() => setOpenComment(status => !status)}>
          <Quote size={18} />
        </button>
      </div>
    </div>
  );
};