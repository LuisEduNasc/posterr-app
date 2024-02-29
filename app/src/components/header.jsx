import { TwitterIcon } from 'lucide-react';
import { useSearchParams } from "react-router-dom";
import { Button } from './button';

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get('posts') ?? '';

  function handlePostsList() {
    setSearchParams(params => {
      params.set('posts', urlFilter === 'following' ? 'all' : 'following');

      return params;
    });
  };

  return (
    <div className='max-w-[1200px] mx-auto flex items-center justify-between'>
      <div className='flex items-center'>
        <TwitterIcon className='mr-2'/>
        <h1>Posterr</h1>
      </div>

      <div className='flex items-center'>
        <Button
          text={urlFilter === 'following' ? 'Following' : 'All'}
          onClick={handlePostsList}
          className='mr-4'
        />
        <p>Posts</p>
      </div>
    </div>
  );
};