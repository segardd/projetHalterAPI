var mongoose = require('mongoose');

let Person = new mongoose.Schema({
    name:{type: String},
    firstname:{type: String},
    birthday:{type: Date},
    club:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    } 
})

let Attempt = new mongoose.Schema({
    weight:{type: Number},
    decision: {
        left: {type: Boolean},
        middle: {type: Boolean},
        right: {type: Boolean}
    }
})

let Competition = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    place: {type: String},
    date: {type: Date},
    responsible: {type: String},
    judges: {
        left: {
            type: Person,
            default: null
        },
        middle: {
            type: Person,
            default: null
        },
        right: {
            type: Person,
            default: null
        },
    },
    competitors: [{
        competitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Competitor'
        },
        weightOfTheDay: {type: Number},
        snatch: {
            first: {
                type: Attempt,
                default: null
            },
            second: {
                type: Attempt,
                default: null
            },
            third: {
                type: Attempt,
                default: null
            }
        },
        cleanJerk: {
            first: {
                type: Attempt,
                default: null
            },
            second: {
                type: Attempt,
                default: null
            },
            third: {
                type: Attempt,
                default: null
            },
        }

        }]
})

module.exports = Competition;