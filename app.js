//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require('mongoose');
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todoList');

const listSchema=new mongoose.Schema({
  name: String
})

const Item= new mongoose.model('Item', listSchema);

app.get("/", function(req, res) {

const day = date.getDate();
  
  Item.find(function(err,foundItems){
  res.render("list", {listTitle: day, newListItems: foundItems});
 })
});





app.post("/", function(req, res){

  const item = req.body.newItem;
  const listName=req.body.list;
  
  const i = new Item({
    name:item
  })
   
    i.save();
    res.redirect('/')


});

 
 

app.post('/delete',function(req,res){
  
  const listName=req.body.hidden;
  const checkedID=req.body.checkbox;
  console.log(checkedID);
 
  Item.findByIdAndRemove(checkedID,function(err){})
  res.redirect('/')
 
 
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
