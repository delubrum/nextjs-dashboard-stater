interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}


export default function Button(props: ButtonProps) {

  const {type, fullWidth, children, onClick, secondary, danger, disabled } = props;

  return ( 
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        flex 
        justify-center 
        p-2
        ${disabled && 'opacity-50 cursor-not-allowed	'}
        ${fullWidth && 'w-full'}
        ${secondary ? 'text-gray-900' : 'text-white'}
        ${danger && 'bg-rose-500 hover:bg-rose-600'}
        ${!secondary && !danger && 'bg-gray-900 hover:bg-black'}
      `}
    >
      {children}
    </button>
   );
}