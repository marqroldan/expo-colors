import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

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
        <View style={{ gap: 20, padding: 20,borderBottomWidth: 1}}>
        <ColorBlockInput index={0} onChange={setColorValue(0)} value={currentSwatch[0]} />
        <ColorBlockInput index={1} onChange={setColorValue(1)} value={currentSwatch[1]} />
        <ColorBlockInput index={2} onChange={setColorValue(2)} value={currentSwatch[2]} />
        </View>
        <View style={{flexDirection: 'row', gap: 20, padding: 20}}>
          <ColorDetailsBlock swatches={currentSwatch}/>

        </View>
        <App2/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});