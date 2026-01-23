import { View, Text, TextInput } from 'react-native'
import React, { createContext, useContext } from 'react'

const NameContext = createContext<string | undefined>(undefined);

function GreeterCtx() {
    const name = useContext(NameContext);

    return (
        <View>
            <Text>Hello { name }</Text>
        </View>
    )
}

export default function ContextDemo() {

    const [name, setName] = React.useState<string>('Max');

    return (
        <NameContext.Provider value={name}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <TextInput 
                value={name}
                onChangeText={setName}
                style={{height:40, borderColor:'gray', borderWidth:1, width:200, marginBottom:20, paddingHorizontal:10}}
            />
            <Text>ContextDemo</Text>
                <GreeterCtx />
                <GreeterCtx />
            </View>
        </NameContext.Provider>
    )
}