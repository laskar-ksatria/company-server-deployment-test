const Schedule = require('../models/schedule')


function scheduleAuthorization(req,res,next) {
   
    let company = req.decoded.id;
    let schedule_id = req.params.schedule_id;
    Schedule.findOne({_id: schedule_id})
        .then(function(schedule) {
            
            if (schedule) {
                if (schedule.company == company) {
                    next();
                }else {
                    next({message: 'You dont have authorize to do that'});
                }
            }else {
                next({message: 'You dont have authorize to do that'});
            };
        })
        .catch(next);
}

module.exports = {
    
    scheduleAuthorization
}

