import { TwitterIcon } from 'lucide-react';

export function Header() {
  return (
    <div className='max-w-[1200px] mx-auto flex items-center justify-between'>
      <div className='flex items-center'>
        <TwitterIcon className='mr-2'/>
        <p>Posterr</p>
      </div>

      <div>
        All/following
      </div>
    </div>
  );
};