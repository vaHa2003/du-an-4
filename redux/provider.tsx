"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import { store, persistor } from "./store";

interface ReduxRenderProps {
  children: ReactNode;
}

export default function ReduxRender({ children }: ReduxRenderProps) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
}
