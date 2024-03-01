import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Repeat2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cn } from '../../lib/utils';
import { Button } from './button';

export function Post({ post, className, author }) {
  const [openComment, setOpenComment] = useState(false);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const canCreatePost = author.posts_count < 5;

  const { mutateAsync } = useMutation({
    mutationFn: async ({ type }) => {
      await fetch('http://localhost:3333/posts', {
        method: 'POST',
        body: JSON.stringify({
          username: author.username,
          user_id: author.id,
          post: `${post.username} - ${post.post}`,
          ...(type === 'quote' && text && { comment: text}),
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
    if (canCreatePost) {
      mutateAsync({ type });
      setOpenComment(false);
    } else {
      setMessage('You reached your posts limit for today!')
    }
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

      <h3 className='ml-4'>{post.post}</h3>

      {
        post.comment
          ? (<p className='text-sm text-slate-400 mt-4'>"{post.comment}"</p>)
          : null
      }

      {
        openComment ? (
          <div>
            <textarea
              placeholder='What`s happening?'
              className='bg-zinc-500 text-white px-4 py-1 w-full h-[100px] rounded-md mt-4'
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={777}
            />
            <p className='text-sm text-slate-500'>{777 - text.length} characters left</p>

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

      <div className='mt-4'>
        <div className='flex justify-end'>
          <button title='Repost' onClick={() => handleNewPost('repost')}>
            <Repeat2 />
          </button>

          <button title='Quote' className='ml-4' onClick={() => setOpenComment(status => !status)}>
            <Quote size={18} />
          </button>
        </div>

        {message ? <p className='text-slate-600 text-sm'>{message}</p> : null}
      </div>
    </div>
  );
};