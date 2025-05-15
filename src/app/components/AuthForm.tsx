"use client";

import { useState } from "react";
import Input from "./ui/Input";
import Loader from "./ui/Loader";
import { signUp } from "@/lib/SupabaseAuth";
import { toast } from "sonner";

export default function AuthForm() {
  const [auth, setAuth] = useState("Sign In");
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const { error } = await signUp(formValues.name, formValues.email, formValues.password);

  setIsLoading(false);

  if (!error) {
    setFormValues({
      name: "",
      email: "",
      password: "",
    });
    toast("Signup successful! check your email for confirmation.");
  } else {
    toast(`Signup failed: ${error.message}`);
  }
};



  return (
    <form
      onSubmit={handleSignUp}
      className="w-full max-w-[635px] flex flex-col items-center bg-white gap-5 px-5 py-8"
    >
      <h1 className="font-bold text-[40px] text-[#B88E2F]">{auth}</h1>

      {auth === "Sign Up" && (
        <Input
          inputId="name"
          label="Name"
          name="name"
          type="text"
          required={true}
          placeholder="Enter Fullname"
          value={formValues.name}
          onChange={handleChange}
          className=""
          errorMessage=""
        />
      )}

      <Input
        inputId="email"
        label="Email"
        name="email"
        type="email"
        required={true}
        placeholder="Enter Email"
        value={formValues.email}
        onChange={handleChange}
                  className=""
          errorMessage=""
      />

      <Input
        inputId="password"
        label="Password"
        name="password"
        type="password"
        required={true}
        placeholder="Enter Password"
        value={formValues.password}
        onChange={handleChange}
                  className=""
          errorMessage=""
      />

      <p className="ml-auto cursor-pointer text-sm font-medium text-[#B88E2F]">
        Forgot Password?
      </p>

      <button
        type="submit"
        className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : auth}
      </button>

      {auth === "Sign In" ? (
        <p
          onClick={() => setAuth("Sign Up")}
          className="cursor-pointer text-sm font-medium text-[#000000] mt-5"
        >
          Don&apos;t have an account?{" "}
          <span className="text-[#B88E2F]">Create Account</span>
        </p>
      ) : (
        <p
          onClick={() => setAuth("Sign In")}
          className="cursor-pointer text-sm font-medium text-[#000000] mt-5"
        >
          Already have an account?{" "}
          <span className="text-[#B88E2F]">Sign In</span>
        </p>
      )}
    </form>
  );
}
