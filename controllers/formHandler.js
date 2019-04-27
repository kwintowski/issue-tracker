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
  
}

module.exports = FormHandler;