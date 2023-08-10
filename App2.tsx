import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import {colorCategories as _colorCategories} from './src/colors';
import Color from 'colorjs.io'
import {  useFonts, DMSans_400Regular, DMSans_700Bold, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

const finalColorCategories = [
  {
      name: 'greyscale',
      values: [0]
  },
  ..._colorCategories,
]

const shadesList = [
  ['27.33', '0.086'],
  ['32.92', '0.111'],
  ['44.22', '0.132'],
  ['46.66', '0.142'],
  ['55.12', '0.092'],
  ['61.68', '0.081'],
  ['64.29', '0.181'],
  ['66.35', '0.112'],
  ['67.21', '0.216'],
  ['72.8', '0.172'],
  ['75.66', '0.124'],
  ['84.38', '0.075'],
  ['85.35', '0.159'],
  ['91.69', '0.019'],
  ['95.75', '0.022'],

] || [
  [ '16.09', '0.036' ],
  [ '19.19', '0.043' ],
  [ '22.98', '0.052' ],
  [ '27.49', '0.062' ],
  [ '32.71', '0.074' ],
  [ '38.56', '0.087' ],
  [ '44.90', '0.102' ],
  [ '51.50', '0.117' ],
  [ '64.44', '0.146' ],
  [ '75.51', '0.135' ],
  [ '83.81', '0.087' ],
  [ '89.41', '0.056' ],
  [ '92.95', '0.036' ],
  [ '95.08', '0.025' ],
  [ '96.33', '0.019' ]
]

const calculateMidpoint = (leftValue, rightValue, max = 360) => {
  const finalRightValue = rightValue < leftValue ? (max + rightValue) : rightValue;
  const diff = Math.abs(leftValue - finalRightValue);
  const halfDiff = diff / 2;

  return (leftValue + halfDiff) % max;
}

const completeTheHueBoundaries = (colorCategories) => {
    const sortedCategories = colorCategories.slice().sort((prev, next) => {
      const prevNumber = prev.values[0];
      const nextNumber = next.values[0];

      return prevNumber - nextNumber;
    })

    console.log('wazzup", ', sortedCategories)
    const finalColors = {};

    for(let i = 0; i < colorCategories.length; i++) {
      const category = sortedCategories[i];
      const name = category.name;
      const value = category.values[0];
 
      const prevIndex = i === 0 ? colorCategories.length - 1 : i - 1;
      const prevCategory = sortedCategories[prevIndex];
      const prevValue = prevCategory.values[0];

      const prevMidPoint = calculateMidpoint(prevValue, value);


      const nextIndex = (i + 1) % colorCategories.length
      const nextCategory = sortedCategories[nextIndex];
      const nextValue = nextCategory.values[0];

      const nextMidPoint = calculateMidpoint(value, nextValue);

      const finalBoundaries = [
        prevMidPoint,
        value,
        nextMidPoint,
      ]

      const finalCenter = [value];

      let boundaries = finalColors[name]?.boundaries;
      if(boundaries) {
        boundaries = boundaries.slice();
        boundaries.push(finalBoundaries)
      } else {
        boundaries = [finalBoundaries]
      }


      finalColors[name] = {
        centers: finalColors[name]?.centers ? finalColors[name].centers.concat(finalCenter) : finalCenter,
        boundaries: boundaries,
        width: Math.abs(value - prevMidPoint) + Math.abs(nextMidPoint - value),
      }

    }

    return finalColors
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }


  const completedBoundaries = completeTheHueBoundaries(_colorCategories);

  const colorSteps = {};

  return (
    <View style={darkMode ? styles.dark : styles.container}>
      <View style={{position: 'absolute', top: 0, left: 0, height: 50}}>

        <Switch value={darkMode} onValueChange={() => {
          setDarkMode((val) => !val)
        }}/>
      </View>
      {
        finalColorCategories.map((item) => {
          const colorItem = completedBoundaries[item.name];
          colorSteps[item.name] = [];

          const defaultIndex = Math.floor(( shadesList.length / 2)  + (shadesList.length * 0.25));
          return (
            <View>
              {
                shadesList.map((shadesListItem) => {
                  const lightness = (parseFloat(shadesListItem[0]) / 100) * (darkMode ? 0.8 : 1);
                  const chroma = item.name === 'greyscale' ? 0 : parseFloat(shadesListItem[1]) + 0.03;

                  const hue = colorItem?.boundaries?.[0]?.[1] ?? 0;
                  const _color = new Color(`oklch(${lightness} ${chroma} ${hue})`);
        
                  const rgbaColor = _color.to('srgb').toString({format: 'hex'});

                  colorSteps[item.name].push(rgbaColor)

                  return (
                    <View style={{
                      width:100,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      'backgroundColor': `oklch(63.49% 0.144 ${hue})`,
                      backgroundColor: 'rgba(1155,25,0,1)',
                      backgroundColor: 'oklch(40.1% 0.123 21.57)',
                      backgroundColor: rgbaColor,
                    }}>
                      <Text style={{marginHorizontal: -500, textAlign: 'center', color: lightness < 0.5 ? 'white' : 'black'}}>{}</Text>
        
                      </View>)
      
                })
              }
              <View style={{height: 50}}/>
              <Pressable style={({pressed, hovered}) => {
                let finalIndex = defaultIndex + 3;
                if(pressed) {
                  finalIndex = defaultIndex + 4;
                } else if (hovered) {
                  finalIndex = defaultIndex + 1;
                }


                return {
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 40,
                  opacity: 0.3,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colorSteps[item.name][finalIndex - 2],
                  //backgroundColor: colorSteps[item.name][finalIndex],
                }
              }}>
              {
                ({pressed, hovered}) => {
                  let finalIndex = defaultIndex
                  if(pressed) {
                    finalIndex = finalIndex + -2;
                  } else if (hovered) {
                    finalIndex = finalIndex - 4;
                  } else  {
                    finalIndex = finalIndex - 3;
                  }

                    return (<Text style={{textAlign: 'center', color: colorSteps[item.name][finalIndex],  fontFamily: 'DMSans_700Bold', letterSpacing: 0.5 }}>BUTTON</Text>)
                }
              }
              </Pressable>
              <View style={{height: 5}}/>
              <Pressable style={({pressed, hovered}) => {
                  let finalIndex = defaultIndex + 3;
                if(darkMode) {
                  finalIndex = defaultIndex;
                  if(pressed) {
                    finalIndex = finalIndex + -2;
                  } else if (hovered) {
                    finalIndex = finalIndex - 4;
                  } else  {
                    finalIndex = finalIndex - 3;
                  }
                } else {
                  if(pressed) {
                    finalIndex = defaultIndex + 4;
                  } else if (hovered) {
                    finalIndex = defaultIndex + 1;
                  }
                }


                return {
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colorSteps[item.name][finalIndex],
                  //backgroundColor: colorSteps[item.name][finalIndex],
                }
              }}>
              {
                ({pressed, hovered}) => {
                  let finalIndex = defaultIndex + 3;
                if(!darkMode) {
                  finalIndex = defaultIndex;
                  if(pressed) {
                    finalIndex = finalIndex + -2;
                  } else if (hovered) {
                    finalIndex = finalIndex - 4;
                  } else  {
                    finalIndex = finalIndex - 3;
                  }
                } else {
                  if(pressed) {
                    finalIndex = defaultIndex + 4;
                  } else if (hovered) {
                    finalIndex = defaultIndex + 1;
                  }
                }

                    return (<Text style={{textAlign: 'center', color: colorSteps[item.name][finalIndex],  fontFamily: 'DMSans_700Bold', letterSpacing: 0.5 }}>BUTTON</Text>)
                }
              }
              </Pressable>
              <View style={{height: 5}}/>
              <Pressable style={({pressed, hovered}) => {
                let finalIndex = defaultIndex + 3;
                if(pressed) {
                  finalIndex = defaultIndex + -1;
                } else if (hovered) {
                  finalIndex = defaultIndex + 1;
                }


                return {
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colorSteps[item.name][finalIndex - 2],
                  backgroundColor: colorSteps[item.name][finalIndex],
                }
              }}>
              {
                ({pressed, hovered}) => {
                  let finalIndex = defaultIndex
                  if(pressed) {
                    finalIndex = finalIndex + -2;
                  } else if (hovered) {
                    finalIndex = finalIndex - 4;
                  } else  {
                    finalIndex = finalIndex - 3;
                  }

                    return (<Text style={{textAlign: 'center', color: colorSteps[item.name][finalIndex],  fontFamily: 'DMSans_700Bold', letterSpacing: 0.5 }}>BUTTON</Text>)
                }
              }
              </Pressable>
              <View style={{height: 5}}/>
              <Pressable style={({pressed, hovered}) => {
                let finalIndex = 4
                if(pressed) {
                  finalIndex = finalIndex + -1;
                } else if (hovered) {
                  finalIndex = finalIndex + 1;
                }


                return {
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 40,
                  // borderWidth: 1,
                  borderRadius: 5,
                  borderColor: colorSteps[item.name][finalIndex - 2],
                  backgroundColor: colorSteps[item.name][finalIndex],
                }
              }}>
              {
                ({pressed, hovered}) => {
                  let finalIndex = 4
                  if(pressed) {
                    finalIndex = finalIndex + -1;
                  } else if (hovered) {
                    finalIndex = finalIndex + 1;
                  }

                    return (<Text style={{textAlign: 'center', color: 'white', fontFamily: 'DMSans_700Bold', letterSpacing: 0.5}}>BUTTON</Text>)
                }
              }
              </Pressable>
              <View style={{height: 5}}/>
              <Pressable style={({pressed, hovered}) => {
                let finalIndex = 7
                if(pressed) {
                  finalIndex = finalIndex + -1;
                } else if (hovered) {
                  finalIndex = finalIndex + 1;
                }


                return {
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 40,
                  // borderWidth: 1,
                  borderRadius: 5,
                  borderColor: colorSteps[item.name][finalIndex - 2],
                  backgroundColor: colorSteps[item.name][finalIndex],
                }
              }}>
              {
                ({pressed, hovered}) => {
                  let finalIndex = 4
                  if(pressed) {
                    finalIndex = finalIndex + -1;
                  } else if (hovered) {
                    finalIndex = finalIndex + 1;
                  }

                    return (<Text style={{textAlign: 'center', color: 'white', fontFamily: 'DMSans_700Bold', letterSpacing: 0.5}}>BUTTON</Text>)
                }
              }
              </Pressable>
              <View style={{height: 5}}/>
              <Pressable style={({pressed, hovered}) => {
                let finalIndex = 8
                if(pressed) {
                  finalIndex = finalIndex + -1;
                } else if (hovered) {
                  finalIndex = finalIndex + 1;
                }


                return {
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  height: 40,
                  //borderWidth: 1,
                  borderRadius: 5,
                  borderColor: colorSteps[item.name][finalIndex - 1],
                  backgroundColor: colorSteps[item.name][finalIndex],
                }
              }}>
              {
                ({pressed, hovered}) => {
                  let finalIndex = 4
                  if(pressed) {
                    finalIndex = finalIndex + -1;
                  } else if (hovered) {
                    finalIndex = finalIndex + 1;
                  }

                    return (<Text style={{textAlign: 'center', color: 'white', fontFamily: 'DMSans_700Bold', letterSpacing: 0.5 }}>BUTTON</Text>)
                }
              }
              </Pressable>
              </View>
          )

          return (
            <View style={{
              width:100,
              height: 50,
              'backgroundColor': `oklch(63.49% 0.144 ${colorItem.boundaries[0][1]})`,
              backgroundColor: 'rgba(1155,25,0,1)',
              backgroundColor: 'oklch(40.1% 0.123 21.57)',
              backgroundColor: rgbaColor,
            }}>
              <Text style={{marginHorizontal: -500, textAlign: 'center'}}>{rgbaColor}</Text>

              </View>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dark: {
    width: '100%',
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
