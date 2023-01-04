const Standup = require('../../models/standup')
const mongoose = require('mongoose')

module.exports = function (router) {
    router.get('/standup', function (req, res) {
        Standup.find()
            .sort({ 'createdOn': 1 })  // 1=ascending, -1-descending
            .exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding standup meeting notes',
                    error: err
                }))        
    })

    router.get('/standup/:teamMemberId', function (req, res) {
        const query = {
            _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId) 
        }
        Standup.find(query)
            .sort({ 'createdOn': 1 })
            .exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding standup notes for team member',
                    error: err
                }))    
            })

    router.post('/standup/', function (req, res) {
        let standup = new Standup(req.body)
        standup.save(function (err, standup) {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json(standup)
        })
    })

}

