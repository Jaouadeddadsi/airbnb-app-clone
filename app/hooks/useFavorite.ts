import { useMemo } from "react";
import { SafeUser } from "../types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}


const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
  const favorite = useMemo(() => {
    if (!currentUser) {
      return false;
    }
    if (!currentUser.favoriteIds) {
      return false;
    }
    return currentUser.favoriteIds.includes(listingId);
  }, [currentUser, listingId]);

  return favorite
}
 
export default useFavorite;