"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { fetchUserDetails } from "@/redux/reducer-services/user";
import { useAppDispatch } from "@/hooks/redux-hook";

// Wrap children in Provider at the top level
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Initializer />
      {children}
    </Provider>
  );
}

// Create a separate component for initializing dispatch
function Initializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return null; // doesn't render anything
}
