// src/services/api.ts
import axios from "axios";

const host = process.env.HOST || "localhost";
const URL = `http://${host}:9000/api/v1`; 

const getAuthToken = () => {
  return localStorage.getItem("token");
}

export const createItem = async (name: string, icon ?: string, folderId ?: number) => {
  const item = axios.post(
    `${URL}/items`,
    { name, icon, folder_id: folderId },
    {  headers: { Authorization: `Bearer ${getAuthToken()}` } }
  );
  return item;
}

export const getItems = async () => axios.get(
  `${URL}/items`, 
  { headers: { Authorization: `Bearer ${getAuthToken()}` }}
);

export const getItem = async (itemId: number) => axios.get(
  `${URL}/items/${itemId}`,
  { headers: { Authorization: `Bearer ${getAuthToken()}`} }
)

export const updateItem = async (itemId: number, data: {name?: string, icon ?: string})  => {
  const item = await axios.put(
    `${URL}/items/${itemId}`,
    data,
    { headers: { Authorization: `Bearer ${getAuthToken()}` } }
  )
  return item;
} 

export const deleteItem = async (itemId: number)  => {
  const item = await axios.delete(
    `${URL}/items/${itemId}`,
    { headers: { Authorization: `Bearer ${getAuthToken()}` } }
  )
  return item;
} 

export const moveItemToFolder = async (itemId: number, folderId: number) =>
  axios.post(
    `${URL}/items/${itemId}/move`, 
    { folder_id:  folderId },
  { headers: { Authorization: `Bearer ${getAuthToken()}` }
  }
);

export const reorderItems = async (items: {id: number, position: number }[]) =>
  axios.post(
    `${URL}/items/reorder`, 
    { items },
    { headers: { Authorization: `Bearer ${getAuthToken()}` }
  }
);




export const creatFolder = async (name: string) => {
  const item = axios.post(
    `${URL}/folders`,
    { name },
    {  headers: { Authorization: `Bearer ${getAuthToken()}` } }
  );
  return item;
}

export const getFolders = async () => axios.get(
  `${URL}/folders`, 
  { headers: { Authorization: `Bearer ${getAuthToken()}` }}
);

export const getFolder = async (folderId: number) => axios.get(
  `${URL}/folders/${folderId}`,
  { headers: { Authorization: `Bearer ${getAuthToken()}`} }
)

export const updateFolder = async (folderId: number, data: {name?: string, state ?: string})  => {
  const item = await axios.put(
    `${URL}/folders/${folderId}`,
    data,
    { headers: { Authorization: `Bearer ${getAuthToken()}` } }
  )
  return item;
} 

export const deleteFolder = async (folderId: number)  => {
  const item = await axios.delete(
    `${URL}/folders/${folderId}`,
    { headers: { Authorization: `Bearer ${getAuthToken()}` } }
  )
  return item;
} 


export const reorderFolder = (folders: {id: number, position: number }[]) =>
  axios.post(
    `${URL}/folders/reorder`, 
    { folders },
    { headers: { Authorization: `Bearer ${getAuthToken()}` }
  }
);




