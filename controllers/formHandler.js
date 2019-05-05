'use strict';

var ObjectId = require('mongodb').ObjectID;

function FormHandler(app, db) {

  this.getIssues = function(project, searchFields) {
    
    console.log(searchFields);
    
    return new Promise(function(resolve, reject){  
      db.collection(project).find(searchFields).toArray((err, doc) => {
        if(err) reject(err);
        resolve(doc);
      }
    )});
  }
  
  this.newIssue = function(project, Issue) {
    
    return new Promise(function(resolve, reject){    
      db.collection(project).insertOne(Issue, (err, doc) => {
        if(err) reject(err);
        resolve(doc);
      }
    )});
  }
  
  this.updateIssue = function(project, id, Issue) {
    
    var newValues = {$set:Issue};
    return new Promise(function(resolve, reject){    
      db.collection(project).updateOne({_id:new ObjectId(id)}, newValues, {new:true}, (err, doc) => {
        if(err) reject("could not update: " + id);
        resolve("successfully updated");
      }
    )});
  }
  
  this.deleteIssue = function(project, id) {
    
    return new Promise(function(resolve, reject){    
      db.collection(project).findOneAndDelete({_id:new ObjectId(id)}, (err, doc) => {
        if(err) reject("could not delete: " + id);
        resolve("deleted " + id);
      }
    )});
  }  
}

module.exports = FormHandler;