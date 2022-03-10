import { reactive, ref } from "vue";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
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

const getUser = (uid: UID): Promise<UserDocument> => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const auth = getAuth();
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

export { userStore, getCurrentUser, getUser, usersCache };
