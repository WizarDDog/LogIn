import { SAVE_DATA } from './const';

export function saveServers(payload) {
    return {
        type: SAVE_DATA,
        payload,
    }
} 
