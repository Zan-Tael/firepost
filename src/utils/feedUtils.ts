import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { PostData, PostDocument, UID } from "@/types/global";
import { errorStore } from "@/utils/errorStore";
import { userStore } from "@/utils/userStore";

const getPosts = (uid?: UID): Promise<Array<PostDocument>> => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const postsRef = collection(db, "posts");
    let q;
    if (uid) {
      q = query(
        postsRef,
        where("user", "==", uid),
        orderBy("timestamp", "desc")
      );
    } else {
      q = query(postsRef, orderBy("timestamp", "desc"));
    }
    getDocs(q)
      .then((querySnapshot) => {
        const mapped = querySnapshot.docs.map((doc) => {
          return {
            [doc.id as UID]: doc.data() as PostData,
          };
        });
        resolve(mapped);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getPosts };
