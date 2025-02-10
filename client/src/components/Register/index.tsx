import AuthForm from "../AuthForm";

const Register = () => {
  return (
    <AuthForm
      title="Register"
      buttonText="Sign Up"
      redirectText="Already have an account?"
      redirectLink="/sign-in"
      isSignUp={true}
    />
  );
};

export default Register;
