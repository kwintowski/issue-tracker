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
      var SearchFields = {};
    
      req.query.issue_title==null?null:SearchFields.issue_title=req.query.issue_title;
      req.query.issue_text==null?null:SearchFields.issue_text=req.query.issue_text;
      req.query.created_by==null?null:SearchFields.created_by=req.query.created_by;
      req.query.assigned_to==null?null:SearchFields.assigned_to=req.query.assigned_to;
      req.query.status_text==null?null:SearchFields.status_text=req.query.status_text;
      req.query.open==null?null:SearchFields.open=(req.query.open=="true");
      
      formHandler.getIssues(project, SearchFields)
        .then((result)=>{console.log(result);res.json(result);})
        .catch((reject)=>{res.json(reject);}); 
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
        req.body.issue_title==''?null:(req.body.issue_title==null?null:Issue.issue_title=req.body.issue_title);
        req.body.issue_text==''?null:(req.body.issue_text==null?null:Issue.issue_text=req.body.issue_text);
        req.body.created_by==''?null:(req.body.created_by==null?null:Issue.created_by=req.body.created_by);
        req.body.assigned_to==''?null:(req.body.assigned_to==null?null:Issue.assigned_to=req.body.assigned_to);
        req.body.status_text==''?null:(req.body.status_text==null?null:Issue.status_text=req.body.status_text);
        req.body.open?Issue.open=false:null;
      }
    
      console.log(Issue);
    
      if(Object.keys(Issue).length>0) {
        Issue.updated_on=(new Date()).toISOString();
        formHandler.updateIssue(project, req.body._id, Issue)
          .then((result)=>{res.json(result);})
          .catch((reject)=>{res.json(reject);}); 
      } else {
        res.json("no updated field sent");
      }
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
      if(req.body._id.length>1) {
        formHandler.deleteIssue(project, req.body._id)
          .then((result)=>{res.json(result);})
          .catch((reject)=>{res.json(reject);}); 
      } else {
        res.json("_id error");
      }
    })
    
};
