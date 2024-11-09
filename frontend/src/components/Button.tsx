export const Button = ({onClick, children} : {onClick: () => void, children: React.ReactNode}) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white mt-4 p-2 rounded-md"
    >
      {children}
    </button>
  );
};
