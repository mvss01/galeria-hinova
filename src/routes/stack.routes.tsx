import { createStackNavigator } from "@react-navigation/stack";

import { Camera } from "../screens/Camera";
import { Galery } from "../screens/Galery";

const { Screen, Navigator } = createStackNavigator()

export const StackRoutes = () => {
    return(
        <Navigator>
            <Screen name="camera" component={Camera} options={{headerShown: false}}/>
            <Screen name="galery" component={Galery} options={{headerShown: false}}/>
        </Navigator>
    )
}
