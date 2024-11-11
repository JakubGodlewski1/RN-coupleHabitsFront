import * as SecureStore from 'expo-secure-store';

class SecureStoreService {
    // Writes a key-value pair to secure storage
    static async set(key: string, value: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(key, value);
            console.log(`Successfully stored key: ${key}`);
        } catch (error) {
            console.error(`Error storing key: ${key}`, error);
        }
    }

    // Reads a value by key from secure storage
    static async get(key: string): Promise<string | null> {
        try {
            const result = await SecureStore.getItemAsync(key);
            if (result) {
                console.log(`Successfully read key: ${key}`);
                return result;
            } else {
                console.log(`Key: ${key} not found`);
                return null;
            }
        } catch (error) {
            console.error(`Error reading key: ${key}`, error);
            return null;
        }
    }

    // Deletes a key-value pair from secure storage
    static async delete(key: string): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(key);
            console.log(`Successfully deleted key: ${key}`);
        } catch (error) {
            console.error(`Error deleting key: ${key}`, error);
        }
    }
}

export default SecureStoreService;