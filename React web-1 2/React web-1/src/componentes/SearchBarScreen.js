import React, {Component, useState} from 'react';

const SearchBarScreen = props => {
  const [newText, setNewText] = useState('');

  return (
    <div>

      <input type="text"
        onChangeText={newText => props.onAddText(newText)}
        returnKeyType="next"
      />
    </div>
  );
};

export default SearchBarScreen;