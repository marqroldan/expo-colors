import React from 'react';
import {View, TextInput, Text} from 'react-native';

type Props = {
    index?: number;
    value: string;
    onChange: (val: string) => void;
}

export function ColorBlockInput(props: Props ) {
    return (
        <View>
            <Text style={{textTransform: 'uppercase', fontSize: 12}}>Color{props.index != null ? ` (#${props.index}) ` : ''}</Text>
        <View style={{flexDirection: 'row', gap: 15}}>
        <View style={{width: 70, height: 40, backgroundColor: props.value, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center'}}>
            {
                !props.value ? <Text>???</Text> : null
            }
            
        </View>
        <TextInput placeholder={'Enter hex code'} onChangeText={props.onChange} value={props.value || ''} style={{paddingLeft: 8, backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)'}} ></TextInput>
        </View>
        </View>
    )
}