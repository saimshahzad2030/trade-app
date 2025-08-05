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
import FullScreenLoader from "../Loader/FullScreenLoader";

// Zod schema with confirm password and strong password rule
const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();
  const [navigateLoading, setNavigateLoading] = React.useState(false); // ⬅️ Local loading state


  const onSubmit = async (data: SignupFormData) => {
    try {
      const { confirmPassword, ...signupData } = data; // exclude confirmPassword from API
      const userSignup = await signup(signupData);

      if (userSignup.status === 201) {
        toast.success(userSignup?.data?.msg || "User Signed Up :)");
        router.push("/login");
      } else {
        toast.error(
          userSignup.data?.email ||
            userSignup.data.username ||
            userSignup.data.password
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Signup failed. Please try again.");
    }
  };

  return (
   <>
   {navigateLoading && <FullScreenLoader/>}
   
    <div className="min-h-screen flex items-center justify-center bg-none px-4 w-full">
      <Card className="w-full max-w-md shadow-lg border-none bg-[#0f0f19]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-gray-300 mb-2">Username</Label>
              <Input id="username" type="text"  className="text-gray-300" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2">Email</Label>
              <Input id="email" type="email" className="text-gray-300" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2">Password</Label>
              <Input id="password" type="password"  className="text-gray-300" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300 mb-2">Confirm Password</Label>
              <Input id="confirmPassword" type="password" className="text-gray-300" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="w-full flex flex-row item-center justify-center text-sm text-gray-300 ">
              Already have an account?
              <Link href="/login"
              onClick={()=>setNavigateLoading(true)}
              className="ml-2 text-[var(--variant-4)]">login</Link>
            </div>

            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
   </>

  );
};

export default SignupForm;
