import type { LucideIcon } from "lucide-react";
import { Key, Mail, User } from 'lucide-react';
import type { AuthFieldType } from "../types/auth.types";


export const LoginFormSchema: (AuthFieldType & { leftIcon?: LucideIcon, rightIcon?: LucideIcon })[] = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    leftIcon: Mail,
    fieldValidators: [
      { type: "required" }
    ]
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    leftIcon: Key,
    isPassword: true,
    fieldValidators: [
      { type: "required" },
      { type: "minLength", constraints: { minLength: 8 } },
    ]
  }
]


export const SignupFormSchema: (AuthFieldType & { leftIcon?: LucideIcon })[] = [
  {
    id: "name",
    label: "Name",
    type: "string",
    placeholder: "Enter your Name",
    leftIcon: User,
    fieldValidators: [
      { type: "required" }
    ]
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    leftIcon: Mail,
    fieldValidators: [
      { type: "required" }
    ]
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    leftIcon: Key,
    fieldValidators: [
      { type: "required" },
      { type: "minLength", constraints: { minLength: 8 } }
    ]
  },
  {
    id: "cnfpassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
    leftIcon: Key,
    fieldValidators: [
      { type: "required" },
    ]
  }
]
