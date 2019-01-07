const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Boletim = mongoose.model('Boletim');

router.get('/', (req,res) => {
    res.render("boletim/addOrEdit", {
        viewTitle: "Inserir Boletim"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var boletim = new Boletim();
    boletim.ano = req.body.ano;
    boletim.mes = req.body.mes;
    boletim.rubrica = req.body.rubrica;
    boletim.conduta = req.body.conduta;
    boletim.latitude = req.body.latitude;
    boletim.longitude = req.body.longitude;
    boletim.cidade = req.body.cidade;
    boletim.logradouro = req.body.logradouro;
    boletim.numero_logradouro = req.body.numero_logradouro;

    boletim.save((err,doc) => { 
        if(!err)
            res.redirect('boletim/list');
        else {
            if(err.name == 'ValidationError') {
                handleValidationError(err,req.body)
                res.render("boletim/addOrEdit", {
                    viewTitle: "Inserir Boletim",
                    boletim: req.body
                });
            } else {
                console.log('Error during record insertion: ' + err);
            } 
        }
    });
}

function updateRecord(req, res) {
    Boletim.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('boletim/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("boletim/addOrEdit", {
                    viewTitle: 'Alterar Boletim',
                    boletim: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req,res) => {
    Boletim.find((err,docs) => {
        if(!err) {
            res.render("boletim/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving boletim list: ' + err);
        }
    });
});

function handleValidationError(err, body) {

    for( field in err.errors) {
        switch(err.errors[field].path) {
            case 'ano':
                body['anoError'] = err.errors[field].message;
                break;
            case 'mes':
                body['mesError'] = err.errors[field].message;
                break;
            case 'rubrica':
                body['rubricaError'] = err.errors[field].message;
                break;
            case 'latitude':
                body['latitudeError'] = err.errors[field].message;
                break;
            case 'longitude':
                body['longitudeError'] = err.errors[field].message;
                break;
            case 'cidade':
                body['cidadeError'] = err.errors[field].message;
                break;
            case 'logradouro':
                body['logradouroError'] = err.errors[field].message;
                break;
            case 'numero_logradouro':
                body['numero_logradouroError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }

}

router.get('/:id', (req, res) => {
    Boletim.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("boletim/addOrEdit", {
                viewTitle: "Alterar Boletim",
                boletim: doc
            });
        }
    });
});

router.get('/details/:id', (req, res) => {
    Boletim.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("boletim/details", {
                viewTitle: "Mais Detalhes do Boletim",
                boletim: doc
            });
        }
    });
});


module.exports = router;