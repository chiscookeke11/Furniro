// utils/auth/SupabaseAuth.ts

import { toast } from "sonner";
import { supabase } from "utils/supabaseClient";

const signUp = async (name: string, email: string, password: string) => {
  try {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      console.log("Error Signing up:", error);
      return { error };
    }

    if (data.user) {
      // Insert a profile row for the new user
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name,
          role: "user", // Default role
          email,
        },
      ]);

      if (profileError) {
        console.error("Error creating profile:", profileError);
        // Continue anyway — user has signed up
      }

      // Optional: Automatically sign in user after signup
      const { error: signInError, data: signInData } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.error("Error auto signing in after signup:", signInError);
        // Not fatal — user still signed up
      } else {
        console.log("Auto Sign In Successful", signInData);
      }
    }

    if (!data.session) {
      console.log("You need to confirm your email before logging in.");
    }

    return { error, data };
  } catch (err) {
    console.error("Unexpected error during sign up:", err);
    return {
      error: { message: "An unexpected error occurred during signup" },
      data: null,
    };
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Error Signing in:", error);
      return { error };
    }

    console.log("Sign In Successful", data);
    return { error, data };
  } catch (err) {
    console.error("Unexpected error during sign in:", err);
    return {
      error: { message: "An unexpected error occurred during sign in" },
      data: null,
    };
  }
};

const signOut = async () => {
  const toastId = toast.loading("Signing out...");

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error signing out:", error);
    toast.error("Sign out failed", { id: toastId }); // update the loading toast to an error
  } else {
    console.log("Signed out successfully");
    toast.success("Signed out", { id: toastId }); // update the loading toast to a success
  }
};

export { signUp, signIn, signOut };
