import { Button } from './button';

export function NewPost() {
  return (
    <div className='bg-zinc-800 p-8 rounded-md'>
      <textarea
        placeholder='What`s happening?'
        className='bg-zinc-500 text-white px-4 py-1 w-full h-[100px] rounded-md'
      />

      <Button
        text='Post' onClick={() => {}}
        className='float-right'
      />
    </div>
  );
};