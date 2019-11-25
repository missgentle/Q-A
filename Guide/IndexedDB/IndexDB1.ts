type indexDBdata = {
  count: number, 
  data: Array<WSRecord.Message>
}
export default class IndexDB {

  private static instance:IndexDB = new IndexDB();  
  private db:Promise<IDBDatabase>;

  private constructor(){}

  public static getInstance():IndexDB {  
      return IndexDB.instance;
  }

  getDB(tableName:string):Promise<IDBDatabase> {
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


  withStore(type:IDBTransactionMode, tableName:string, callback:Function) {
     return this.getDB(tableName).then((db) => {
       return new Promise(function(resolve, reject) {
        var transaction = db.transaction(tableName, type);
        transaction.oncomplete = function() {
          resolve();
        };
        transaction.onerror = function() {
          reject(transaction.error);
        };
        callback(transaction.objectStore(tableName));
      });
    });
  }

    getAll(tableName:string): Promise<indexDBdata> {
      var req,count;
      return this.withStore( 'readonly', tableName, (store) => {
        req = store.getAll();
        count = store.count();
      }).then(() => {
        return {
          count:count.result,
          data:req.result
        };
      });
    }

    get(tableName:string, key:string): Promise<WSRecord.Message> {
      var req;
      return this.withStore( 'readonly', tableName, (store) => {
        req = store.get(key);
      }).then(() => {
        return req.result;
      });
    }

    set(tableName:string, key:string, value:any):void {
      this.withStore( 'readwrite', tableName, (store) => {
        store.put(value, key);
      });
    }

    delete(tableName:string, key:string):void {
      this.withStore( 'readwrite', tableName, (store) => {
        store.delete(key);
      });
    }

    clear(tableName:string):void {
      this.withStore( 'readwrite', tableName, (store) => {
        store.clear();
      });
    }

}




