import Clipboard from '@react-native-community/clipboard';
import {Alert} from 'react-native';

export function copyToClipboard(toCopy: string): void {
    Clipboard.setString(toCopy);
    Alert.alert('Room ID copied to clipboard!');
}
