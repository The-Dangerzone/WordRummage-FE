import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import './styles.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="root">
     {!open && (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className="menuButton"
        sx={{backgroundColor: 'rgb(33, 70, 40)', border: '2px solid black'}} 

      >
        <MenuIcon />
      </IconButton>
    )}
      <Drawer
        className={`drawer ${open ? 'transparentDrawer' : ''}`}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: 'drawerPaper',
        }}
      >
        <div className="drawerHeader">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Button variant="contained" color="primary" fullWidth className="sidebarButton">
          Sign In
        </Button>
      </Drawer>
    </div>
  );
};

export default Sidebar;
