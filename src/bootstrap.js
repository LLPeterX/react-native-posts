import * as Font from 'expo-font'
import { DB } from './db'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf')
    });
    await DB.init();
    console.log('DB started, fonts loaded!');
  } catch (e) {
    console.error(e);
  }
}
