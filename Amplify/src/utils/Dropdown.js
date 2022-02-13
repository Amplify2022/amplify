import React from 'react';
import {View, Text, Picker} from 'react-native';

const Dropdown = props => {
  const dropdownChanged = e => {
    props.changed(e.target.value);
  };

  return (
    <View>
      <Text>
        <Picker value={props.selectedValue} onChange={dropdownChanged}>
          {props.options.map((item, idx) => (
            <option key={idx} value={item.id}>
              {item.name}{' '}
            </option>
          ))}
        </Picker>
      </Text>
    </View>
  );
};

export default Dropdown;
