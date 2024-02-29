import { cn } from '../../lib/utils';

export function Post({ post, className }) {
  return (
    <div className={cn(
      'bg-zinc-800 p-8 rounded-md',
      className
    )}>
      <h2 className='mb-4'>{post.username}</h2>
      <h3>{post.post}</h3>
    </div>
  );
};