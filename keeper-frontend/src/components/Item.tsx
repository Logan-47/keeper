/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import { moveItemToFolder } from "../services/api";
import { useItemsContext } from "../context/Item/useItemContext";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Button } from "@mui/material";

interface ItemProps {
  id: number;
  name: string;
  icon: string;
  folderId: number
  position: number
  index: number,
  reorderItem: (fromIndex: number, toIndex: number) => void
}


const Item = ({ 
  id,
  name,
  icon,
  folderId: itemFolderId,
  position: itemPosition, 
  index,
  reorderItem
}: ItemProps) => {
  const {  itemDelete, refreshData } = useItemsContext()
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log("this triggered!!")
    refreshData()
  }, [itemPosition])
  

  const [, drop] = useDrop(() => ({
      accept: "ITEM",
      drop: async (draggedItem: {id: number, name: string, folderId: number, position: number, index: number}) => {
        console.log(draggedItem.name, draggedItem.id, draggedItem.index, draggedItem.folderId);
        console.log(name, id , index, itemFolderId)
        if(draggedItem.folderId === itemFolderId) {
          if(draggedItem.index !== index) {
            reorderItem(draggedItem.index, index);
            draggedItem.index = index;
            draggedItem.position = index;
          }
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id, name, folderId: itemFolderId, position: itemPosition, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    }),
  }));

  const onDeleteClick = async () => {
    await itemDelete(id);
  }
  
  drag(drop(itemRef))

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={itemRef} style={{ padding: "10px", zIndex: 100}}>
      <ListItemButton divider sx={{ pl: 4 }} key={id} style={{ opacity }}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText>
          {name}
        </ListItemText>
        <Button variant="outlined"  onClick={onDeleteClick} style={{ marginBottom: "10px"}}>
        <DeleteForeverRoundedIcon fontSize="small"/> Delete
      </Button>
      </ListItemButton>
      
    </div>
    
  );
};

export default Item;
