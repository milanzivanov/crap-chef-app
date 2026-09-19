"use client";

import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import styles from "./button.module.css";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
  }
>;

export default function Button({
  children,
  className = "",
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
