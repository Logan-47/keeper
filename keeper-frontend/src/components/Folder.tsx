import { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import {  useItemsContext } from "../context/Item/useItemContext";
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Item from "./Item";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EmojiPicker from 'emoji-picker-react';
import InsertEmoticonSharpIcon from '@mui/icons-material/InsertEmoticonSharp';
import Grid from '@mui/material/Grid2';
import { Item as ItemType } from "../context/Item/ItemsContext";
import { moveItemToFolder } from "../services/api";

interface FolderProps {
  id: number;
  name?: string;
  state?: string,
  items : ItemType[],
}

const Folder = ({ id, name, state, items }: FolderProps) => {
  const { addItem, folderUpdate, itemReorder } = useItemsContext();
  const folderRef = useRef<HTMLDivElement>(null);
  const [folderOpen, setFolderOpen] = useState(state === "open");
  const [dialogOpen, setDialogOpen] = useState(false)
  const [openEmojiSelector, setOpenEmojiSelector] = useState(false)
  const [selectEmoji, setSelectedEmoji] = useState(null);

  useEffect(() => {
    setFolderOpen(state === "open")
  }, [state])

  const reorderItem = async (fromIndex: number, toIndex: number) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    console.log("updatedMap1", updatedItems);
    updatedItems.forEach((item, index) => {
      item.position = index
    });
    const reorderMap = updatedItems.map(item => ({
      id: item.id,
      position: item.position
    }))
    itemReorder(reorderMap);
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: async (draggedItem: { id: number, name: string, folderId: number, position: number }) => {
      console.log("draggedItem", draggedItem);
      console.log("dragged in ", id, name)
      if(draggedItem.folderId !== id ) {
        await moveItemToFolder(draggedItem.id, id)
      }
     },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  const togglerFolderState = async () => {
    if(id >= 0)
      await folderUpdate(id, { state: (folderOpen) ? "CLOSED": "OPEN"} );
    setFolderOpen(!folderOpen);
  }

  const addItemToFolder = async () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleOnDialogSubmit = async (name: string, icon: string) => {
    await addItem(name, icon, id);
    setSelectedEmoji(null)
    setDialogOpen(false);
    location.reload()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEmojiClicked = (emoji: any) => {
    setSelectedEmoji(emoji.emoji);
    setOpenEmojiSelector(false);
  }

  drop(folderRef)

  return (
    <>
    <div ref={folderRef} className="folder-body" >
     
      <div
        className="folder"
        onClick={togglerFolderState}
        >
        
          <Grid container spacing={4}>
            <Grid size={2}>
              {id >= 0 && (folderOpen || isActive ? <FolderOpenIcon fontSize="large" /> : <FolderIcon fontSize="large" />)}
            </Grid>
            <Grid size={8} textAlign={"center"} fontSize={"20px"}>
              {name ||"" }
            </Grid>
              {(folderOpen || id <= 0 )&& <Button variant="outlined"  onClick={addItemToFolder} style={{marginLeft: "40px"}}>
                <AddSharpIcon fontSize="medium"/> Add Item
              </Button>}
          </Grid>
      </div>
      <Collapse in={(folderOpen || isActive || id == -1) } >
          <List>
          {items
            .map((item, index) => (
                <Item 
                  key={item.id}
                  id={item.id}
                  index={index}
                  name={item.name} 
                  icon={item.icon} 
                  folderId={id}
                  position={item.position}
                  reorderItem={reorderItem}
                />
            ))}
            
          </List>
      </Collapse>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const formJson = Object.fromEntries((formData as any).entries());
              const itemName = formJson.itemName;
              handleOnDialogSubmit(itemName, (selectEmoji) ? selectEmoji : "");
            },
          },
        }}
      >
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={2}>
              <div onClick={() => (setOpenEmojiSelector(!openEmojiSelector))} style={{ marginTop: "30px", marginLeft: "10px" }}>
                <InsertEmoticonSharpIcon></InsertEmoticonSharpIcon>
              </div>
              </Grid>
              <Grid size={10}>
              <div>{selectEmoji && selectEmoji}</div>
              <TextField
                autoFocus
                required
                margin="dense"
                id="itemName"
                name="itemName"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid>
                {openEmojiSelector == true && <EmojiPicker onEmojiClick={onEmojiClicked} ></EmojiPicker>}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
    </Dialog>
    </div>
    </>
  );
};

export default Folder;
