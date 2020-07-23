const mysql = require('mysql');
//const env = require('../.env');
const { update } = require('../Controllers/BurgerController');

class Burger{

  constructor(args){
    if (typeof args == 'object') { 
      let keys = Object.keys(args);
      keys.forEach(key => this[key] = args[key]);
    }
  }

  static find(id){
    const conn = mysql.createConnection(env.db);
    conn.connect();
    const queryString = "select * from orders where id = ? limit 1";
    let promise = new Promise((resolve, reject) => {
      conn.query(queryString, id, function(error, results) {
        if (error) reject(error);
        if (results.length = 1) {
          resolve(new Burger(results[0]));
        }
      });
      conn.end();
    });
    return promise;
  }

  static all(){
    let res = [];
    const conn = mysql.createConnection(env.db);
    conn.connect();
    const queryString = "select * from orders";
    let promise = new Promise((resolve, reject) => {
      conn.query(queryString, function(error, results) {
        if (error) reject(error);
        if (results && results.length > 0) {
          results.forEach(one => res.push(new Burger(one)));
          resolve(res);
        }
      });
      conn.end();
    });
    return promise;
  }

  save(){
    const conn = mysql.createConnection(env.db);
    conn.connect();
    let promise = new Promise((resolve, reject) => {
      if (!this.id) {
        const query = 'INSERT INTO orders SET ?';
        conn.query(query, this, err => {
          if (err) reject(err);
          resolve();
          conn.end();
        });
      } else {
        let query = updateQuery(this);
        conn.query(query, err => {
          if (err) reject(err);
          resolve();
          conn.end();
        });
      }
    });
    return promise;
  }
}

function updateQuery(obj) {
  const keys = Object.keys(obj);
  let query = 'update orders set ';
  let elements = [];
  keys.forEach(key => {
    if (key != 'id') {
      elements.push(`${key} = ${typeof obj[key] == 'string' ? "'" + obj[key] + "'" : obj[key]}`);
    }
  });
  query += elements.join(', ');
  query += ` where id = ${obj.id}`;
  return query;
}

module.exports = Burger;