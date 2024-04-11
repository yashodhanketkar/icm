export type NoteType = {
  id: string;
  title: string;
  body: string;
};

export enum Stores {
  Notes = "notes",
}

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open("icmDB");

    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains(Stores.Notes)) {
        console.log("Creating notes");
        db.createObjectStore(Stores.Notes, {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log("request onsuccess - initDB", version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(
  storename: string,
  data: T,
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open("icmDB", version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storename, "readwrite");
      const store = tx.objectStore(storename);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getData = <T>(storename: string): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open("icmDB");

    request.onsuccess = () => {
      console.log("request onsuccess - getAllData");
      db = request.result;
      const tx = db.transaction(storename, "readonly");
      const store = tx.objectStore(storename);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};
