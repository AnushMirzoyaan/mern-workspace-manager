import AuthForm from "../AuthForm";

const SignIn = () => {
  return (
    <AuthForm
      title="Log In"
      buttonText="Sign In"
      redirectText="Don’t have an account?"
      redirectLink="/register"
      isSignUp={false}
    />
  );
};

export default SignIn;
