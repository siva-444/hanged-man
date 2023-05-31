import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from './constants';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    return false
  }
}


export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (e) {
  }
  return null;
}

export const setHighScore = (score) => {
  return storeData(KEYS.HIGH_SCORE, score);
}
export const getHighScore = () => {
  return getData(KEYS.HIGH_SCORE);
}

export const setRoundDetails = (round_details) => {
  return storeData(KEYS.ROUND_DETAILS, round_details);
}
export const getRoundDetails = () => {
  return getData(KEYS.ROUND_DETAILS);
}
export const addRoundDetails = async (round_detail) => {
  const prev_round_details = await getRoundDetails() ?? [];
  prev_round_details.push(round_detail);

  return setRoundDetails(prev_round_details);
}