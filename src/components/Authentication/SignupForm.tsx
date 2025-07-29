"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signup } from "@/services/authentication.services";
import { useRouter } from "next/navigation";

// Zod schema for validation
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
const router = useRouter()
  const onSubmit = async (data: SignupFormData) => {
    try {
        console.log(data)
        let userSignup = await signup(data);
    //   await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       if (data.email === "taken@example.com") {
    //         reject(new Error("Email already in use"));
    //       } else {
    //         resolve("success");
    //       }
    //     }, 1000);
    //   });
    console.log(userSignup.data)
    if (userSignup.status==201){
        toast.success(userSignup?.data?.msg || "User Signed Up :)");
        router.push('/login')
    }
    else{

        toast.error(userSignup.data?.email || userSignup.data.username || userSignup.data.password);
    }
    //   reset();
    } catch (error: any) {
      toast.error(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-none px-4 w-full">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
<div className="w-full flex flex-row item-center justify-center text-sm ">
             Already have an account? <Link href={'/login'} className="ml-2">login</Link>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
