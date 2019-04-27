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
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
