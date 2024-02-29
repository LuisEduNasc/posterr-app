export function DefaultMessage({ message }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-4xl font-semibold text-zinc-300'>{message}</p>
    </div>
  );
};