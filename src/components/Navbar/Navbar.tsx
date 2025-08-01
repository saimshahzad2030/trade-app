"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
 
import { useState } from "react";
import SearchBar from "../Searchbar/Searchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import Cookies from "js-cookie"; 
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, logout } from "@/redux/reducers/authReducer";
import RoundLoader from "../Loader/RoundLoader";
import { User } from "@/types/types";
import FullScreenLoader from "../Loader/FullScreenLoader";
function ConfirmationModal({
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  children,
}: {
  onConfirm: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{description}</p>
        <DialogFooter>
          <Button className="cursor-pointer" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
          className="cursor-pointer"
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
interface RootState {
  auth: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
}
const Navbar = () => {   
  let user = useSelector((state:RootState) => state.auth?.user);
  let loading = useSelector((state:RootState) => state.auth?.loading );
 const [navigateLoading,setNavigateLoading] = React.useState(false)
  const token = Cookies.get('accessToken')
  const router = useRouter()
  const dispatch = useDispatch()
  const pathName = usePathname();
   const handleLogout = () => { 
    dispatch(logout()); 
    router.push('/'); // or homepage if preferred
  };
  return (
    <>
    {navigateLoading &&<FullScreenLoader/>}
    <div className=" fixed w-full  z-50">
      <div
        className={`px-8 flex flex-row items-center relative py-4 justify-between h-[10vh] ${
          pathName == "/"
            ? " backdrop-blur-md backdrop-saturate-150 bg-[rgba(19,19,31,0.15)] "
            : "bg-[#13131f]"
        } `}
      >
        {/* <img className="h-8 w-auto" src="/assets/logo.png" /> */}
        <Link onClick={()=>setNavigateLoading(true)} href={"/"} className="text-3xl font-bold text-[var(--variant-3)]">
          LOGO 
        </Link>
        
        {pathName !== "/" && <SearchBar />}
 
        <div className="flex flex-row items-center justify-end  w-5/12  ">
           <div className="flex flex-row items-center mr-4">
          <Link onClick={()=>setNavigateLoading(true)} href={"/chart"} className={ `font-bold ml-4 text-sm ${pathName=='/chart'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Chart
        </Link>
        <Link onClick={()=>setNavigateLoading(true)} href={"/housing"} className={ `font-bold ml-4 text-sm ${pathName=='/housing'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Housing
        </Link>
        <Link onClick={()=>setNavigateLoading(true)} href={"/stock-screening"} className={ `font-bold ml-4 text-sm ${pathName=='/stock-screening'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Screener
        </Link>
        <Link onClick={()=>setNavigateLoading(true)} href={"/pricing"} className={ `font-bold ml-4 text-sm ${pathName=='/pricing'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Pricing
        </Link>
         <Link onClick={()=>setNavigateLoading(true)} href={"/portfolio"} className={ `font-bold ml-4 text-sm ${pathName=='/portfolio'?'text-[var(--variant-4)]':'text-white'} hover:text-[var(--variant-4)] transition-colors duration-300`}>
          Portfolio
        </Link>
        </div>
   
         {loading?
        <RoundLoader/>:
        <>{
          user?<div className="flex flex-row items-center">
            <div className="w-10 h-10 flex flex-row items-center justify-center rounded-full bg-[var(--variant-2)] text-white ml-2">{user?.username.slice(0,1).toUpperCase()}</div>
            <ConfirmationModal
          title="Log out?"
          description="Are you sure you want to logout?"
          onConfirm={handleLogout}
        >
          <Button
            size="lg"
            variant="second"
            className="mr-1 text-red-400 hover:border-red-400"
          >
            Logout
          </Button>
        </ConfirmationModal>
          </div>
         :
         <> <Link href="/login">
            <Button
            onClick={()=>{setNavigateLoading(true)}}
              size="lg"
              variant="second"
              className="mr-1 transition-colors duration-300"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
            onClick={()=>{setNavigateLoading(true)}}
              size="lg"
              variant="second"
              className="ml-1 transition-colors duration-300"
            >
              Sign Up
            </Button>
          </Link></>
        }</>}
        </div>
      </div>
    </div></>
  );
};

export default Navbar;
