import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Route(params: any) {
    const { id } = useLocalSearchParams();
    console.log(params);

    return <View><Text>My id: {id}</Text></View>
}

