import { reactive, ref } from "vue";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import type { UserDocument, UserData, UID } from "@/types/global";

const userStore = ref<User | null>(null);

const usersCache = ref<Record<UID, UserData>>({});

const getCurrentUser = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: User | null) => {
        userStore.value = user;
        unsubscribe();
        resolve(user!);
      },
      reject
    );
  });
};

const getUserDocument = (uid: UID): Promise<UserDocument> => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data() as UserData;
          usersCache.value.uid = data;
          resolve({ [uid]: data });
        } else {
          reject("User doesn't exist");
        }
      })
      .catch((error) => reject(error));
  });
};

const getUserDocumentFromUsername = (
  username: string
): Promise<UserDocument> => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    getDocs(q)
      .then((querySnapshot) => {
        resolve({ [querySnapshot.docs[0].id]: querySnapshot.docs[0].data() });
      })
      .catch((error) => reject(error));
  });
};

export {
  userStore,
  getCurrentUser,
  getUserDocument,
  getUserDocumentFromUsername,
  usersCache,
};
