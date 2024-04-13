import { NoteType, Stores, version } from "./util";

const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("icmDB");

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(Stores.Notes)) {
        db.createObjectStore(Stores.Notes, {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

const addData = <T>(
  storeName: string,
  data: T,
): Promise<(T & { done: boolean }) | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("icmDB", version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const storeData = { ...data, done: false };
      store.add(storeData);
      resolve(storeData);
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

const getData = <T>(storeName: string): Promise<T[]> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("icmDB");

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

const updateData = (
  storeName: string,
  note: NoteType,
): Promise<NoteType | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("icmDB", version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const update = { ...note, done: !note.done };
      store.put(update);
      resolve(update);
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

const deleteData = (storeName: string, key: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("icmDB");

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.delete(key);

      res.onsuccess = () => {
        resolve(true);
      };

      res.onerror = () => {
        resolve(false);
      };
    };
  });
};

export type { NoteType } from "./util";
export { Stores, initDB, addData, getData, updateData, deleteData };
