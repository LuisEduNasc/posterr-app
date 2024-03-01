import { cn } from '../../lib/utils';

export function Button({ className, onClick, disabled, children }) {
  return (
    <button
      className={cn(
        'bg-cyan-900 px-8 rounded hover:bg-cyan-800',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};