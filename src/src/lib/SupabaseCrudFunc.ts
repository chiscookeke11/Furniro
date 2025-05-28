import { supabase } from "utils/supabaseClient"



// in SupabaseCrudFunc.ts or similar
const addToFavourite = async ({
  image,
  furnitureName,
  description,
  price,
  newPrice,
  category,
}: {
  image: string;
  furnitureName: string;
  description: string;
  price: number;
  newPrice: number;
  category: string;
}) => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log("Error fetching session:", sessionError.message);
    return;
  }

  if (!session) {
    console.log("No active session found");
    return;
  }

  const userId = session.user.id;

  const { error } = await supabase.from("favourites").insert({
    id: userId,
    furniture_name: furnitureName,
    price: price,
    image_url: image,
    description: description,
    new_price: newPrice,
    category: category,
  });

  if (error) {
    console.log("Error adding to favourites:", error.message);
  } else {
    console.log("Item added to favourites!");
  }
};




// const removeFromFavourite = async () => {
//     const {data, error} = await supabase.from("favourites").delete().eq("id", id)

//     if (error) {
//         console.log("error deleting favourite")
//     }
//     else {
//         console.log("removed successfuly")
//     }
// }


export {
    // removeFromFavourite,
    addToFavourite
}