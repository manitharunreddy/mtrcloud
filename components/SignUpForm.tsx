"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpForm = () => {
  const [verifying, setVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { isLoaded, setActive, signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    setAuthError(null);
    try {
      signUp.create({
        emailAddress: data.email,
        password: data.password,
        

      });
    } catch (error) {}
  };

  const handleVerificationSubmit = async () => {};

  if (verifying) {
    return <h1>This is OTP entering field .</h1>;
  } else {
    return <h1>SignUp Form with email and other fields .</h1>;
  }
};

export default SignUpForm;
