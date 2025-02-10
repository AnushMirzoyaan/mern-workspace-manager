export interface AuthFormProps {
  title: string;
  buttonText: string;
  redirectText: string;
  redirectLink: string;
  isSignUp?: boolean;
}

export interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}
