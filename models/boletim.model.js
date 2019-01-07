const mongoose = require('mongoose');

var boletimSchema = new mongoose.Schema({
    ano: {
        type: String,
        required: 'This fiel is required'
    }, 
    mes: {
        type: String,
        required: 'This fiel is required'
    },
    rubrica: {
        type: String,
        required: 'This fiel is required'
    },
    conduta: {
        type: String
    },
    latitude: {
        type: String,
        required: 'This fiel is required'
    },
    longitude: {
        type: String,
        required: 'This fiel is required'
    },
    cidade: {
        type: String,
        required: 'This fiel is required'
    },
    logradouro: {
        type: String,
        required: 'This fiel is required'
    },
    numero_logradouro: {
        type: String,
        required: 'This fiel is required'
    }
});

mongoose.model('Boletim', boletimSchema);