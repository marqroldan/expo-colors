import React from 'react';
import {View, Text} from 'react-native';
import Color from 'colorjs.io'

type Props = {
    swatches: string[];
}

export function ColorDetailsBlock(props: Props) {

    let finalColorDetails = [];

    for(let i = 0; i < props.swatches.length; i++) {
        const item = props.swatches[i]
        try {
            const _color = new Color(item);
            const [lightness, chroma, hue] = _color.to('oklch').toString().replace('oklch(','').replace(')','').split(' ');

            finalColorDetails.push(`Lightness: ${(parseFloat(lightness) * 100).toFixed(2)}\nChroma: ${(parseFloat(chroma)).toFixed(3)}\nChroma: ${(parseFloat(hue)).toFixed(2)}`)
        } catch(e) {
            // no-op
        }
    }





    return <View style={{borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.03)', gap: 40, padding: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)'}}>
        <Text style={{fontWeight: 'bold'}}>Swatch Details</Text>
        <View style={{gap: 20}}>
        {
            finalColorDetails?.map((item, index) => {
                return (<View style={{}}>
                    <Text>Color details for <Text style={{fontWeight: 'bold'}}>{props.swatches[index]}</Text>:</Text>
                    <Text>{item}</Text>
                    </View>)
            })
        }
        </View>
    </View>
}