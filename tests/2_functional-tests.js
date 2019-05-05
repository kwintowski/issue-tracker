/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body[0].issue_title, 'Title');
          assert.equal(res.body[0].issue_text, 'text');
          assert.equal(res.body[0].created_by, 'Functional Test - Every field filled in');
          assert.equal(res.body[0].assigned_to, 'Chai and Mocha');
          assert.equal(res.body[0].status_text, 'In QA');
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.containsAllKeys(res.body[0], ['issue_title','issue_text','created_by'], 'Contains All Keys');
          done();
        });
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          created_by: 'Functional Test - Every field filled in'
        })
        .end(function(err, req){
          //not sure this is working correctly
          assert.doesNotHaveAllKeys(req.body[0], ["issue_title","issue_text","created_by"], 'Does Not Have All Keys');
          done();
        })
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          //insert proper ID here
          _id: '5ccc4f25ed481519d30d4244',
          issue_title: 'Title'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.notExists(res.body[0].issue_text);
          done();
        });
      });
      
      test('One field to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          //insert proper ID here
          _id: '5ccc4f25ed481519d30d4244',
          issue_title: 'Title'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.lengthOf(res.body[0].keys().length, 2); //_id and 1 more field
          done();
        });        
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          //insert proper ID here
          _id: '5ccc4f25ed481519d30d4244',
          issue_title: 'Title',
          issue_text: 'Text test'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          console.log('Keys: '+res.body[0].keys());
          assert.isAtLeast(res.body[0].keys().length, 2); //_id and 1 more field
          done();
        });        
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/apitest')
        .query({issue_text:'big lagoon'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({issue_text:'text',assigned_to:'Chai and Mocha'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });        
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({_id:''})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, '_id error');
          done();
        });
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({_id:'5cce7eba0f2b7b2902e5c6f3'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'deleted 5cce7eba0f2b7b2902e5c6f3');
          done();
        });        
      });
      
    });

});
