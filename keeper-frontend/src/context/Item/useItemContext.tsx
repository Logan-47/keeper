import { useContext } from "react";
import { ItemsContext } from "./ItemsContext";

export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (!context) throw new Error("useItems must be used within ItemsProvider");
  return context;
};
