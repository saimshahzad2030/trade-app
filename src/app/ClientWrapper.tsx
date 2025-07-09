"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  // You can use hooks and client-side logic here
  return <>
  <Provider store={store}>{children}
    </Provider></>;
}
