import React from 'react';
import Rooms from './Rooms';
import ItemRoom from './Rooms/Item';
import CreateRoom from './Rooms/Create';
import CreateReview from './Reviews/Create';
import { Scene, Router } from 'react-native-router-flux';

const App = () => {
  return (
    <Router sceneStyle={{ paddingTop: 60 }/* this is the spacing for the menu bar on the top */}>
     
      <Scene key="Rooms" component={Rooms} title="Room List" />
      <Scene key="ItemRoom" component={ItemRoom} title="Room Details" />
      <Scene key="CreateRoom" component={CreateRoom} title="Create New Room" />

      <Scene key="CreateReview" component={CreateReview} title="Create New Review" />

    </Router>
  );
};

export default App;
