import { createStackNavigator } from "@react-navigation/stack";

import { CameraScreen } from "../screens/Camera";
import { GalleryScreen } from "../screens/Gallery";
import { PhotoScreen } from "../screens/Photo";

const { Screen, Navigator } = createStackNavigator()

export const StackRoutes = () => {
    return(
        <Navigator>
            <Screen name="gallery" component={GalleryScreen} options={{headerShown: false}}/>
            <Screen name="camera" component={CameraScreen} options={{headerShown: false}}/>
            <Screen name="photo" component={PhotoScreen} options={{headerShown: false}}/>
        </Navigator>
    )
}
