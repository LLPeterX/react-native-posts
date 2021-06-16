import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db')

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts ( id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT,  booked INT)', //sql
          [], // arguments list
          resolve, // callback from promise
          (_, error) => reject(error) // callback from promise
        );
      });
    })
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM posts', //sql
          [], // arguments
          (_, result) => resolve(result.rows._array), // callback from promise with array of items
          (_, error) => reject(error) // callback from promise
        );
      });
    })
  }

} // class DB