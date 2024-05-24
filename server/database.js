import mysql from 'mysql2'
import dotenv from 'dotenv';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// const users = await pool.query('SELECT * FROM users');
// console.log(users[0]);

// const findWateById  = async function(id){
//     const [rows] = await pool.query(`SELECT * FROM ewaste WHERE waste_id=?`,[id]);
//     return rows;
// } 

// const waste = await findWateById(1);
// const insertedWaste = await findWateById(2);
// console.log(waste,insertedWaste);

// const addWaste = async function(name,type,price,weight){
//     const [rows] = await pool.query(`INSERT INTO ewaste(name,type,price,weight) VALUES (?,?,?,?)`,[name,type,price,weight]);
//     return rows;
// }

// const newWaste = await addWaste('Lg - 36 oled','Tv',20000,1000);
// console.log(newWaste);

const deleteWaste = async function(){
    const [rows] = await pool.query(`DELETE FROM ewaste WHERE waste_id=?`,[3]);
    return rows;
}

// const deleted = await deleteWaste()
// console.log(deleted);

export default pool;
// module.exports = pool;
