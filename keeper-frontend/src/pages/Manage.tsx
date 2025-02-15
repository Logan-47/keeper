// src/pages/Manage.tsx
import { useEffect,} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Folder from "../components/Folder";
import { useItemsContext } from "../context/Item/useItemContext";
import { useAuthContext } from "../context/Auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import Dialog from '@mui/material/Dialog';
import { useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

const Manage = () => {
  const [dialogOpen,setDialogOpen] = useState(false)
  const { items, folders, addNewFolder,  } = useItemsContext();
  const { email } = useAuthContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email)
    if(!email) {
      navigate('/login')
    }
  }, [])
  
    
    
    const onLogoutClick = () => {
      logout();
      navigate('/login')
    }
    
    const handleDialogClose = () => {
      setDialogOpen(false)
    }
    
    const onNewfolderClick = async () => {
      setDialogOpen(true)
    }
    
    const handleOnDialogSubmit = async (name: string) => {
      await addNewFolder(name);
      setDialogOpen(false)
    }
    
  // drop(divRef);
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8} border={2}>
        <h1>Folders</h1>
        </Grid>
        <Grid size={2}  >
          <Button 
            onClick={onNewfolderClick}
            variant="outlined"
            style={{marginTop: "20px", alignContent: "center"}}
          > 
          <CreateNewFolderRoundedIcon fontSize="large"/>
            New Folder
          </Button>
          
        </Grid>
        <Grid size={2} fontStyle={'oblique'}>
          <Button onClick={onLogoutClick} style={{ marginTop: "20px"}} variant="outlined">
          <LogoutSharpIcon fontSize="large" />
            Logout
          </Button>
        </Grid>
        <Grid size={12} border={2}>
        <DndProvider backend={HTML5Backend}>
          <div >
            <div className="w-3/4">
              <Folder key={-1} id={-1} items={items.filter(item => item.folder === null)}/>
            </div>
            <div>
                {
                folders &&
                  folders.map((folder) => (
                    <Folder key={folder.id}
                    id={folder.id}
                    name={folder.name}
                    state={folder.state}
                    items={items.filter(item => (item.folder && item.folder.id === folder.id))}
                    />
                  ))
                }
            </div>
          </div>
        </DndProvider>
        </Grid>
      </Grid>
    </Box>
    <div className="relative">
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
              const folderName = formJson.folderName;
              handleOnDialogSubmit(folderName);
            },
          },
        }}
      >
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="folderName"
            name="folderName"
            label="Folder Name"
            fullWidth
            variant="standard"
          />
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

export default Manage;
