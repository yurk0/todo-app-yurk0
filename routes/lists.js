var express = require('express');
var List = require('../models').lists;
var router = express.Router();

router.get('/', function(req, res){

     List.findAll({
         where: { deleted: 0 }
     }).then(list => {
         res.render('index', { todoLists: list });
     });
 });



router.get('/:id', function(req, res){
    List.findById(req.params.id).then(list => {
        res.status(200).json(list);
    });
});

router.post('/create', function(req, res){
    List.create({
        description: req.body.description,
        deleted: 0
    }).then(list => {
        res.redirect('/');
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

//just set deleted to 1
router.post('/destroy/:id', function(req, res){
    // List.destroy({
    //     where: { id: req.params.id }
    List.update({
        deleted: 1
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.redirect('/');
    });
});

module.exports = router;