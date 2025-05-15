
import { supabase } from "utils/supabaseClient"




const signUp = async (name: string, email: string, password: string) => {
 const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name,
    },
  },
});

if (error) {
  console.log("Error Signing up", error.message);
  return { error };
} else if (data) {
  console.log("Sign Up Successful");
}
return { error };

};







export  {
    signUp,
}