export interface AuthFormProps {
  title: string;
  buttonText: string;
  redirectText: string;
  redirectLink: string;
  isSignUp?: boolean;
}

export interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}
export interface Workspace {
  _id: string;
  name: string;
  slug: string;
}

export interface WorkspaceFormData {
  name: string;
  slug: string;
}
