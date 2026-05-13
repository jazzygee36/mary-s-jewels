type GlobalErrorProps = {
  message?: string;
  onRetry?: () => void;
};

const GlobalError = ({
  message = "Something went wrong",
  onRetry,
}: GlobalErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
      <h2 className="text-[20px] font-bold text-red-600">Oops!</h2>

      <p className="text-gray-600 mt-2">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-[#4C0213] text-white rounded-full"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default GlobalError;
