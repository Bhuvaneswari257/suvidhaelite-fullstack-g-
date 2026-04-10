import { MdError, MdClose } from 'react-icons/md';

export default function ErrorAlert({ message, onClose, variant = 'error' }) {
  const bgColor = variant === 'error' ? 'bg-red-50' : 'bg-yellow-50';
  const borderColor = variant === 'error' ? 'border-red-200' : 'border-yellow-200';
  const textColor = variant === 'error' ? 'text-red-700' : 'text-yellow-700';
  const iconColor = variant === 'error' ? 'text-red-500' : 'text-yellow-500';

  if (!message) return null;

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-4 mb-4 flex items-start gap-3`}>
      <MdError className={`${iconColor} text-xl flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className={`${textColor} text-sm font-medium`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-75 transition`}
        >
          <MdClose size={20} />
        </button>
      )}
    </div>
  );
}
