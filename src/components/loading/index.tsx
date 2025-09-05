const Loading = ({ className, color }: { className?: string;  color: 'blue' | 'white' }) => {
  return (
    <div
      className={`w-5 h-5 border-4 border-t-transparent rounded-full animate-spin
        ${ color === 'blue' ? 'border-sky-600' : 'border-white' }
        ${className} `}
    ></div>
  );
}

export default Loading;
