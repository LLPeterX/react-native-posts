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

  static createPost({img, text, date}) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO posts (img, text, date, booked) VALUES (?,?,?,?)',
          [img, text, date, 0], // arguments
          (_, result) => resolve(result.insertId), // callback from promise with array of items
          (_, error) => reject(error) // callback from promise
        );
      });
    });
  }

  static updatePost(post) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE posts SET booked=? WHERE id= ?',
          [post.bookled ? 0 : 1, post.id], // arguments
          resolve, // callback from promise
          (_, error) => reject(error)
        );
      });
    });
  }

  static deletePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM posts WHERE id= ?',
          [id],
          resolve, 
          (_, error) => reject(error)
        );
      });
    });
  }

} // class DB