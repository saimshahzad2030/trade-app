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
import { login } from "@/services/authentication.services";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import Cookies from "js-cookie";
// Zod schema for form validation
const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => { 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
const router = useRouter()
  const onSubmit = async (data: LoginFormData) => {
     try {
            console.log(data)
            let userSignup = await login(data);
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
        if (userSignup.status==200){
           Cookies.set("accessToken", userSignup.data.access, { expires: 7 }); // ⬅️ Set token for 7 days
    
            toast.success(userSignup?.data?.msg || "User Loggedin  :)");
    router.push('/portfolio')
        }
        else{
    
            toast.error(userSignup.data?.email || userSignup.data.username || userSignup.data.password || userSignup.data.detail);
        }
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-none px-4 w-full">
      <Card className="w-full max-w-md shadow-lg border-none bg-[#0f0f19]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-gray-300 mb-2">Username</Label>
              <Input id="username" type="text" className="text-gray-300" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2">Password</Label>
              <Input id="password" type="password" className="text-gray-300" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
<div className="w-full flex flex-row item-center justify-center text-sm text-gray-300  ">
             Don't have an account? <Link href={'/signup'} className="ml-2 text-[var(--variant-4)]">Signup</Link>
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
 

export default LoginForm
