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
      console.log("Error Signing up", error);
      return { error };
    }

    // If sign up is successful and we have a user, create a profile record
    if (data.user) {
      try {
        // Create a profile record in the profiles table
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            name: name,
            role: "user", // Default role
          },
        ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          // We don't return an error here as the auth signup was successful
        }
      } catch (profileErr) {
        console.error("Unexpected error creating profile:", profileErr);
      }
    }

    if (data.session) {
      console.log("Sign Up Successful");
    } else {
      console.log("You need to confirm email");
    }

    return { error, data };
  } catch (err) {
    console.error("Unexpected error during sign up:", err);
    return {
      error: { message: "An unexpected error occurred" },
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
      console.log("Error Signing in", error);
      return { error };
    }

    console.log("Sign In Successful", data);
    return { error, data };
  } catch (err) {
    console.error("Unexpected error during sign in:", err);
    return {
      error: { message: "An unexpected error occurred" },
      data: null,
    };
  }
};


const signOut = async () =>  {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Error signing out")
  }
}

export { signUp, signIn, signOut };
