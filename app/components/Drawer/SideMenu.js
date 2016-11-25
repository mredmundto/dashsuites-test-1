import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// TODO should come from another source
const menuList = [
  {
    key: 'RoomList',
    title: 'Rooms List',
  },
  {
    key: 'ReviewList',
    title: 'Reviews List',
  },
  {
    key: 'CleaningList',
    title: 'Cleaing Schedule',
  },
];

const SideMenu = (props) => {
  const {
    toggleDrawer,
  } = props;
  return (
    <View>
      {menuList.map((menu, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              toggleDrawer(false);
              Actions[menu.key]({ type: 'replace' });
            }}
            key={i}
          >
            <Text style={{ color: 'black', margin: 10, fontSize: 15, textAlign: 'left' }}>
              {menu.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
SideMenu.propTypes = {
  toggleDrawer: PropTypes.func,
};

export default SideMenu;
