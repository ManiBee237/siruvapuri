import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: 'ℹ️',
    style: {
      background: '#3B82F6',
      color: '#fff',
      padding: '16px',
      borderRadius: '8px',
    },
  });
};

export const showConfirm = (message, onConfirm) => {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="font-medium">{message}</p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
    position: 'top-center',
  });
};
