import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentInterimValue, setCurrentInterimValue] = useState();
  const [currentValue, setCurrentValue] = useState();

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
    setCurrentInterimValue(hex);
  };

  return (
    <View style={styles.container}>
      <Button title='Color Picker' onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType='slide'>
        <ColorPicker style={{ width: '70%' }} value={currentValue} onComplete={onSelectColor}>
            <View style={{width: 320}}>

            <Preview />
          <Panel1 />
            </View>
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title='Ok' onPress={() => {
            setShowModal(false)
            setCurrentValue(currentInterimValue);
        }} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});