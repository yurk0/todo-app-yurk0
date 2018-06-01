var express = require('express');
var Point = require('../models').points;
var List = require('../models').lists;
var router = express.Router();


router.get('/l/:id', function(req, res){
    var listName = '';
    List.findOne({where: {id: req.params.id}}).then(list => {listName = list.description});

    Point.findAll({where: { deleted:0, list_id: req.params.id }
    }).then(pointsList => {
        res.render('points', { todoPoints: pointsList, list_id: req.params.id, listDescription: listName });
    });
});

router.get('/point/:id/:lid', function(req, res){
    Point.findOne({where: {point_id: req.params.id}}).then(
        point => {
          res.render('point',{point})
        }
    ).error(err => {
        res.status(405).json('Error has occured');
    });

});

router.post('/create/:id', function(req, res){
    Point.create({
        list_id: req.params.id,
        description: req.body.description
    }).then(list => {
        res.redirect('/points/l/'+req.params.id);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.post('/destroy/:id/:lid', function(req, res){
    Point.update({
        deleted: 1
    },{
        where: { point_id: req.params.id }
    }).then(result => {
        res.redirect('/points/l/'+req.params.lid);
    });
});

router.post('/done/:id/:lid', function(req, res){
    Point.update({
        result: 1
    },{
        where: { point_id: req.params.id }
    }).then(result => {
        res.redirect('/points/l/'+req.params.lid);
    });
});

router.post('/undone/:id/:lid', function(req, res){
    Point.update({
        result: 0
    },{
        where: { point_id: req.params.id }
    }).then(result => {
        res.redirect('/points/l/'+req.params.lid);
    });
});

router.post('/edit/:id/:lid', function(req, res){
    Point.update({
        description: req.body.description
    },{
        where: { point_id: req.params.id }
    }).then(result => {
        res.redirect('/points/l/'+req.params.lid);
    });
});

module.exports = router;