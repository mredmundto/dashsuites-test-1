import React from 'react';
import Rooms from './Rooms';
import Item from './Rooms/Item';
import { Scene, Router } from 'react-native-router-flux';

const App = () => {
  return (
    <Router sceneStyle={{ paddingTop: 60 }/* this is the spacing for the menu bar on the top */}>
      <Scene key="Rooms" component={Rooms} title="Room List" />
      <Scene key="Item" component={Item} title="Room Details" />
    </Router>
  );
};

export default App;
