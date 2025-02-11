"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button";
import { AuthFormProps } from "@/utils/types";
import Image from "next/image";
import { toast } from "react-toastify";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/services/auth/auth";

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  redirectText,
  redirectLink,
  isSignUp = false,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  // const auth = useAuth();

  const router = useRouter();

  const isFormValid = email && password && (!isSignUp || confirmPassword);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (isSignUp) {
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be at least 8 characters long and contain at least one letter and one number."
        );
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
    }
    try {
      if (isSignUp) {
        await signUp({ fullName, email, password });
      } else {
        await signIn({ email, password });
      }
      router.push("/workspace-manager");
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>{title}</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Image
              src={isPasswordVisible ? "/show.svg" : "/hide.svg"}
              height={18}
              width={18}
              onClick={togglePasswordVisibility}
              alt={isPasswordVisible ? "Hide password" : "Show password"}
              className={styles.passwordIcon}
            />
          </div>
          {isSignUp && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>

              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Image
                src={isConfirmPasswordVisible ? "/show.svg" : "/hide.svg"}
                height={18}
                width={18}
                onClick={toggleConfirmPasswordVisibility}
                alt={
                  isConfirmPasswordVisible ? "Hide password" : "Show password"
                }
                className={styles.passwordIcon}
              />
            </div>
          )}
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            {buttonText}
          </Button>
        </form>

        <p className={styles.redirectText}>
          {redirectText}
          <Link href={redirectLink}>
            <span className={styles.blueText}>
              {redirectLink === "/sign-in" ? "Sign In" : "Sign Up"}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
