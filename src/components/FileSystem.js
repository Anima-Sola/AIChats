//Work with AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataToStore = async ( storageKey, value ) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem( storageKey, jsonValue );
    } catch (e) {
        console.log('Async storage something goes wrong');
    }
}

export const getDataFromStore = async ( storageKey ) => {
    try {
        const jsonValue = await AsyncStorage.getItem( storageKey );
        return jsonValue !== null ? JSON.parse( jsonValue ) : null;
    } catch(e) {
        console.log('Async storage something goes wrong');
    }
}