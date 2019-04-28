'use strict';

function FormHandler(app, db) {

  this.newIssue = function(project, Issue) {
    
    return new Promise(function(resolve, reject){    
      db.collection(project).insertOne(Issue, (err, doc) => {
            if(err) reject(err);
            resolve(doc);
          }
      )});
  }
  
  this.updateIssue = function(project, Issue) {
    
    var newValues = {$set:Issue};
    return new Promise(function(resolve, reject){    
      db.collection(project).updateOne({_id:Issue._id}, newValues,{new:true}, (err, doc) => {
            if(err) reject("could not update: " + err);
            resolve("successfully updated");
          }
      )});
  }
  
}

module.exports = FormHandler;