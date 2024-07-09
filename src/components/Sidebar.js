import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Home, Info, Dashboard, BarChart } from '@mui/icons-material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const Sidebar = ({ open }) => {
  // Define menu items with their respective icons and links
  const menuItems = [
    { name: 'Pending Requests', icon: <NotificationImportantIcon />, link: '/Pending Requests' },
    { name: 'Info', icon: <Info />, link: '/Info' },
    { name: 'Stats', icon: <BarChart />, link: '/stats' },
    { name: 'Revocation', icon: <Dashboard />, link: '/Revoke' },
    { name: 'Home', icon: <Home />, link: '/home' },
  ];

  return (
    <Drawer
      variant="persistent"
      open={open}
      style={{
        width: open ? 240 : 0,
        transition: 'width 0.3s',
        zIndex: 1000,
      }}
      PaperProps={{
        style: {
          position: 'fixed',
          backgroundColor: '#e3afed',
          top: 60,
          left: 0,
          width: 240,
          height: 'calc(100% - 60px)',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.name} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
