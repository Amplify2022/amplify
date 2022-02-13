import React from 'react';
import {View, Button, Text} from 'react-native';

const Listbox = props => {
  const clicked = e => {
    e.preventedDefault();
    props.clicked(e.target.id);
  };

  return (
    <View>
      <Text>
        {props.items.map((item, idx) => (
          <Button key={idx} onClick={clicked} id={item.track.id}>
            {item.track.name}
          </Button>
        ))}
      </Text>
    </View>
  );
};

export default Listbox;
