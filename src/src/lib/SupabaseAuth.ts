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

const signInWithGoogle = async () => {
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.log("error signing in with google");
  } else {
    console.log(data);
  }
};

const resetPassword = async (email: string) => {
const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`

  const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
   redirectTo,
  });

  if (error) {
    console.error("error resetting password", error);
    toast.error("Failed!");
  } else {
    console.log(data);
    toast.success("Successful! Please check your email for reset link");
  }
};

const updateUserPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    toast.error("Failed to update password");
    console.error("error reset", error);
    return { success: false, error };
  } else {
    toast.success("Password updated successfully!");
    console.log("Password updated successfully", data);
    return { success: true };
  }
};

export {
  signUp,
  signIn,
  signOut,
  signInWithGoogle,
  resetPassword,
  updateUserPassword,
};
