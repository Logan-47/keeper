import { createContext} from 'react'

export interface Folder {
  id: number;
  name: string;
  state: string,
  items: Item[];
  position: number
}

export interface Item {
  id: number;
  name: string;
  icon: string;
  folder: Folder;
  position: number
}

export interface ItemsContextType {
  folders: Folder[];
  items: Item[];
  refreshData: () => void;
  addNewFolder: (string: string) => Promise<void>;
  addItem: (name: string, icon: string, folderId ?: number) => Promise<void>,
  itemUpdate: (itemId: number, data: {name ?: string, icon ?: string}) => Promise<void>,
  itemReorder: (items: {id: number, position: number}[]) => Promise<void>,
  itemDelete: (itemId: number) => Promise<void>,
  folderDelete: (folderId: number) => Promise<void>,
  folderUpdate: (folderId: number, data: { name ?: string, state ?: string }) => Promise<void>,
  folderReorder: (folders: {id: number, position: number}[]) => Promise<void>
}

export const ItemsContext = createContext<ItemsContextType | undefined>(undefined);