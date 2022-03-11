interface Field {
  value: string;
  feedback?: string;
}

type UID = string;

interface UserData {
  followers: Array<string>;
  username: string;
  name: string;
  photoURL: string;
}

interface PostData {
  text: string;
  user: string;
  timestamp: bigint;
}

interface UserDocument {
  [UID]: UserData;
}

interface PostDocument {
  [UID]: PostDocument;
}

export { Field, UserDocument, UID, UserData, PostData, PostDocument };
