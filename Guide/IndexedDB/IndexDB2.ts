export default class IndexDB {

  private static instance:IndexDB = new IndexDB();  
  private db:Promise<IDBDatabase>;

  private constructor(){}

  public static getInstance():IndexDB {  
      return IndexDB.instance;
  }

  private getDB(tableName:string):Promise<IDBDatabase> {
    if (!this.db) {
      this.db = new Promise((resolve, reject) => {
        let openreq:IDBOpenDBRequest = indexedDB.open('UX-store', 1);
        openreq.onerror = () => {
          reject(openreq.error);
        };
        openreq.onupgradeneeded = () => {
          openreq.result.createObjectStore(tableName);
        };
        openreq.onsuccess = () =>  {
          resolve(openreq.result);
        };
      });
    }
    return this.db;
  }


  private withStore(type:IDBTransactionMode, tableName:string): Promise<IDBObjectStore> {
    return new Promise((resolve, reject) => {
      this.getDB(tableName).then((db) => {
        var transaction = db.transaction(tableName, type);
        resolve(transaction.objectStore(tableName));
        transaction.onerror = function() {
          reject(transaction.error);
        };
      });
    });
  }
 
    getAll(tableName:string): Promise<Array<WSRecord.Message>> {
      let resultRequest: IDBRequest;
      return new Promise((resolve, reject) => {
        this.withStore( 'readonly', tableName).then((store) => {
          resultRequest = store.getAll();
          resultRequest.onsuccess = (e) => {
            resolve(resultRequest.result);
          };
        });
      });
    }

    get(tableName:string, key:string): Promise<WSRecord.Message> {
      let resultRequest: IDBRequest;
      return new Promise((resolve, reject) => {
        this.withStore( 'readonly', tableName).then((store) => {
          resultRequest = store.get(key);
          resultRequest.onsuccess = (e) => {
            resolve(resultRequest.result);
          };
        });
      });
    }

    set(tableName:string, key:string, value:any):void {
      this.withStore( 'readwrite', tableName).then((store) => {
        store.put(value, key);
      });
    }

    delete(tableName:string, key:string):void {
      this.withStore( 'readwrite', tableName).then((store) => {
        store.delete(key);
      });
    }

    clear(tableName:string):void {
      this.withStore( 'readwrite', tableName).then((store) => {
        store.clear();
      });
    }

}
