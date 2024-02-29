import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function Post({ post, className }) {
  return (
    <div className={cn(
      'bg-zinc-800 p-8 rounded-md',
      className
    )}>
      <h2 className='mb-4'>
        <Link to={`/profile/${post.user_id}`}>
          {post.username}
        </Link>
      </h2>
      <h3>{post.post}</h3>
    </div>
  );
};