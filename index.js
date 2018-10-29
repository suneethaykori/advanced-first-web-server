let express = require("express");
let bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use(express.static('public'))

let users = require("./state").users;

app.get("/users", function(req,res,next){
    //tell express what to do when it recieves a GET message to path /users
    return res.json(users);

});

let obj =   {
         "_id": 8,
        "name": "Jack Brown",
         "occupation": "CIA Agent",
        "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
     };

app.get("/users/:userid", function(req,res,next){
    return res.json(users[req.params.userid]);

});

// app.post("/users", function(req,res,next){
//     return res.json(users.push(obj));

// });

app.post("/users",function(req,res){
    const myid = parseInt(users[users.length-1]._id)+1;
    users.push(req.body);
   console.log(req);
   users[users.length-1]._id=myid;
   return res.json(req.body);
 })

app.put("/users/:userid", function(req,res,next){

    for (let property1 in req.body) {
        users[req.params.userid][property1]= req.body[property1];
      }
      
      return res.json(req.body);

});

app.delete("/users/:userid", function(req,res,next){

    users[req.params.userid].isActive=false;

    return res.send("Deleted");
});


app.listen(3002, (err) => {
    if (err) {
    return console.log("Error", err);
    }
     console.log("Web server is now living in apartment 3002");
 });


 
//     "_id": 8,
//     "name": "Jack Brown",
//     "occupation": "CIA Agent",
//     "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
// };


// app.post('/users',function(request,response){
//     users.push(obj);
//     });

// app.listen(3002, (err) => {
// if (err) {
//   return console.log("Error", err);
// }
// console.log("Web server is now living in apartment 3002");
// });
