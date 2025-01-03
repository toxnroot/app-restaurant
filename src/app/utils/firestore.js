import { db } from '../api/firebase.config';
import { collection, addDoc } from 'firebase/firestore';

export const createCollection = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
    console.log('Collection created successfully!');
  } catch (error) {
    console.error('Error creating collection:', error);
  }
};
