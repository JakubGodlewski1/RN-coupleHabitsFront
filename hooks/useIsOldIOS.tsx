import {useEffect, useState} from "react";
import DeviceInfo from "react-native-device-info";

//the function checks if iphone is older than iphone 10
export default function useIsOldIOS(){
    const [isOlderThanIphoneX, setIsOlderThanIphoneX] = useState(false);

    useEffect(() => {
        const checkDevice = async () => {
            const model = await DeviceInfo.getModel();

            // List of models older than iPhone X
            const olderModels = [
                'iPhone', 'iPhone 3G', 'iPhone 3GS', 'iPhone 4', 'iPhone 4s',
                'iPhone 5', 'iPhone 5c', 'iPhone 5s', 'iPhone 6', 'iPhone 6 Plus',
                'iPhone 6s', 'iPhone 6s Plus', 'iPhone SE', 'iPhone 7', 'iPhone 7 Plus',
                'iPhone 8', 'iPhone 8 Plus'
            ];

            setIsOlderThanIphoneX(olderModels.includes(model));
        };

        checkDevice();
    }, []);

    return isOlderThanIphoneX
}