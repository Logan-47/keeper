import { useEffect, useState } from "react";
import { 
  createItem,
  getItems,
  updateItem,
  deleteItem,
  reorderItems,
  creatFolder,
  getFolders,
  updateFolder,
  deleteFolder,
  reorderFolder
 } from "../../services/api";
// import socket from "../services/socket";
import { useAuthContext } from "../Auth/useAuthContext";
import { ItemsContext, Folder, Item } from "./ItemsContext";
import { io } from "socket.io-client";

const socket = io("http://localhost:9000");


export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, getToken } = useAuthContext();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const fetchData = async () => {
    const token = getToken()
    if(!token) return;
    const foldersRes = await getFolders();
    const itemsRes = await getItems();
    const folders = foldersRes.data.data.folders;
    const items = itemsRes.data.data.items;
    folders.sort((a: { position: number; }, b: { position: number; }) => a.position - b.position)
    items.sort((a: { position: number; }, b: { position: number; }) => a.position - b.position)
    setFolders(folders);
    setItems(items);
  };

  useEffect(() => {
    if (!user) return;
    fetchData()
    
    socket.on("foldersUpdated", (updatedFolders) => {
      updatedFolders.sort((a: { position: number; }, b: { position: number; }) => a.position - b.position)
      setFolders(updatedFolders);
    })

    socket.on("itemsUpdated", (updatedItems) =>{
      // console.log("items update received!!")
      updatedItems.sort((a: { position: number; }, b: { position: number; }) => a.position - b.position)
      setItems(updatedItems);
    })

    socket.on("itemsAndFoldersUpdated", ({ updatedItems, updatedFolders }) => {
      updatedItems.sort((a: { position: number; }, b: { position: number; }) => a.position - b.position)
      updatedFolders.sort((a: { position: number; }, b: { position: number; }) => a.position - b.position)
      setItems(updatedItems);
      setFolders(updatedFolders);
    })

    return () => {
      socket.off("foldersUpdated");
      socket.off("itemsUpdated");
      socket.off("itemsAndFoldersUpdated");
    };
  }, []);

  const addNewFolder = async (name: string) => {
    await creatFolder(name);
    // await fetchData();
  }

  const addItem = async (name: string, icon: string, folderId ?: number) => {
    await createItem(name, icon, folderId);
    // await fetchData();
  }

  const itemUpdate = async (itemId: number, data: {name ?: string, icon ?: string}) => {
    const { name, icon } = data;
    await updateItem(itemId, {name, icon});
    // await fetchData();
  }

  const itemReorder = async (items: {id: number, position: number}[] ) => {
    await reorderItems(items);
    // await fetchData();
  }

  const itemDelete = async (itemId: number) => {
    await deleteItem(itemId);
    // await fetchData();
  }

  const folderUpdate = async (folderId: number, data: {name ?: string, state ?: string}) => {
    const { name, state } = data;
    await updateFolder(folderId, { name, state });
    await fetchData();
  }

  const folderReorder = async (folders: {id: number, position: number}[] ) => {
    await reorderFolder(folders);
    await fetchData();
  }

  const folderDelete = async (folderId: number) => {
    await deleteFolder(folderId);
    await fetchData();
  }

  return (
    <ItemsContext.Provider value={{ 
        folders,
        items,
        refreshData: fetchData,
        addNewFolder,
        addItem,
        itemUpdate,
        itemReorder,
        itemDelete,
        folderUpdate,
        folderDelete,
        folderReorder
      }}>
      {children}
    </ItemsContext.Provider>
  );
};

