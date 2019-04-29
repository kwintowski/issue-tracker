/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var FormHandler = require('../controllers/formHandler.js');

module.exports = function (app,db) {

  var formHandler = new FormHandler(app,db);

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      var Issue = { issue_title: req.body.issue_title,
                    issue_text:  req.body.issue_text,
                    created_by:  req.body.created_by,
                    assigned_to: req.body.assigned_to,
                    status_text: req.body.status_text, 
                    created_on:  (new Date()).toISOString(),
                    updated_on:  (new Date()).toISOString(),
                    open:        true
                  };
      
    
      formHandler.newIssue(project, Issue)
        .then((result)=>{res.json(result.ops);})
        .catch(e=>console.log(e));   
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
      var Issue = {};
    
      if(req.body._id) {
        req.body.issue_title==""?null:Issue.issue_title=req.body.issue_title;
        req.body.issue_text==""?null:Issue.issue_text=req.body.issue_text;
        req.body.created_by==""?null:Issue.created_by=req.body.created_by;
        req.body.assigned_to==""?null:Issue.assigned_to=req.body.assigned_to;
        req.body.status_text==""?null:Issue.status_text=req.body.status_text,
        req.body.open?Issue.open=false:null;
        Issue.updated_on=(new Date()).toISOString();
      }
    
      console.log(Issue);
    
      if(Object.keys(Issue).length>0) {
        formHandler.updateIssue(project, req.body._id, Issue)
          .then((result)=>{res.json(result);})
          .catch((reject)=>{res.json(reject);}); 
      } else {
        res.json("no updated field sent");
      }
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
      if(req.body._id) {
        formHandler.deleteIssue(project, req.body._id)
          .then((result)=>{res.json(result);})
          .catch((reject)=>{res.json(reject);}); 
      } else {
        res.json("_id error");
      }
    })
    
};
