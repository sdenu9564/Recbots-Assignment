const bcrypt = require('bcrypt');
const db = require('../dbserver');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const jwt_secret = 'jhgjuhiuhih54hjb@jbdkvkdhkdhk5676hjhvskhf#56';
exports.usersingup =  async (req,res) => {
    const user_name = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const plan = "Silver";
    console.log(hashedPassword);
    const mobile  = req.body.mobile;
    db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM users WHERE email = ?"
     const search_query = mysql.format(sqlSearch,[email])
     const sqlInsert = "INSERT INTO users VALUES (0,?,?,?,?,?)"
     const insert_query = mysql.format(sqlInsert,[user_name,email, hashedPassword,mobile,plan])
     // ? will be replaced by values
     // ?? will be replaced by string
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)
      if (result.length != 0) {
       connection.release()
       console.log("------> User already exists")
       res.sendStatus(409) 
      } 
      else {
       await connection.query (insert_query, (err, result)=> {
       connection.release()
       if (err) throw (err)
       console.log ("--------> Created new User")
       res.status(200).json({message:"created" ,user:[{name:user_name,email:email,phone:mobile,plan:plan}]})
      })
     }
    }) //end of connection.query()
    }) //end of db.getConnection()
    } //end of app.post()



exports.userlogin = async (req,res) =>{
const email = req.body.email
const password = req.body.password
db.getConnection ( async (err, connection)=> {
 if (err) throw (err)
 const sqlSearch = "Select * from users where email = ?"
 const search_query = mysql.format(sqlSearch,[email])
 await connection.query (search_query, async (err, result) => {
  connection.release()
  
  if (err) throw (err)
  if (result.length == 0) {
   console.log("--------> User does not exist")
   res.sendStatus(404)
  } 
  else {
     const hashedPassword = result[0].password
     //get the hashedPassword from result
    if (await bcrypt.compare(password, hashedPassword)) {
    console.log("---------> Login Successful")
    const id=result.user_id;
    const token = jwt.sign({id:id},jwt_secret)
    res.status(200).json({message:'loggedIn',data:token,user : result});
    } 
    else {
    console.log("---------> Password Incorrect")
    res.send("Password incorrect!")
    } 
  }
 }) 
})

}



exports.upgrade = async(req,res)=>{
const plan = req.body.plan;
const email = req.body.email;
const token = req.body.token;
const id = jwt.verify(token , jwt_secret);
console.log(id);
db.getConnection ( (err, connection)=> {
    if (err) throw (err)
    const sqlSearch = "Select * from users where email = ?"
    const search_query = mysql.format(sqlSearch,[email])
    const update_sql = `UPDATE users SET plan= ? WHERE email= ?`
    connection.query (search_query,  (err, result) => {
     if (err) throw (err)
     if (result.length == 0) {
        connection.release()
      console.log("--------> User does not exist")
      res.sendStatus(404)
     } 

     else{
        connection.query(update_sql ,[plan , email], (err,result)=>{
            connection.release()
            if (err) throw (err)
            console.log ("--------> updated the user")
            // console.log(result.insertId)
            res.status(201).json({plan:plan})
        } )
     }
    }) 
   })

}
