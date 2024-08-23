import React, { useState } from 'react';
import {Button, Modal, StyleSheet, Switch, TextInput, View} from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { ColorBlockInput } from './src/components/ColorBlockInput';
import { ColorDetailsBlock } from './src/components/ColorDetailsBlock';

import {default as App2} from './App2';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentInterimValue, setCurrentInterimValue] = useState();
  const [currentValue, setCurrentValue] = useState();

  //// brand colors
  const [currentSwatch, setCurrentSwatch] = useState<string[]>(['#1FAA9E', '#2A2B6D']);
  const [darkMode, setDarkMode] = useState(false);

  const [chroma, setChroma] = useState('0.112');
  const [shadesList, setShadesList] = useState(JSON.stringify([[6.72],
      [13.98],
      [17.76],
      [21.34],
      [24.78],
      [34.06],
      [42.19],
      [50.32],
      [66],
      [76.68],
      [83.9],
      [88.84],
      [92.19],
      [94.61],
      [96.12],
      [97.61],
      [99.11],
      [99.7]]))

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
    setCurrentInterimValue(hex);
  };

  const setColorValue = (index: number) => (value: string) => {
    setCurrentSwatch((state) => {
        const newState = state.slice();
        newState[index] = value;
        return newState;
    })
  }

  return (
    <View style={styles.container}>
      <View style={{height: 100, width: '100%', position: 'sticky', flexDirection: 'row'}}>

        <Switch value={darkMode} onValueChange={() => {
          setDarkMode((val) => !val)
        }}/>
          <TextInput placeholder={'chroma'} value={chroma} onChangeText={setChroma} style={{borderWidth: 1, height: 36}} />
          <TextInput placeholder={'shadesList'} value={shadesList} onChangeText={setShadesList} style={{borderWidth: 1, height: 36, flex: 1}} />
      </View>
      <View style={{flex: 1}}>

        <App2 darkMode={darkMode} chroma={chroma} shadesList={shadesList}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
