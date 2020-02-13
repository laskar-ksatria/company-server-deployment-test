const { verifyToken } = require('../helpers');
const Vehicle = require('../models/vehicle');

async function authentification(req,res,next) {
    
    try {
        if (req.headers.token) {
            let decoded = verifyToken(req.headers.token);
            req.decoded = decoded;
            
            next()
    
        }else {
            next({message: 'You must login as Company'})
        }
    } catch (error) {
        next(error);

    }
};

async function userAuthentification(req,res,next) {
    try {
        if (req.headers.token) {
            let decoded = verifyToken(req.headers.token);
            req.decoded = decoded;
            next()
        }
    }catch(error) {
        next(error)
    }
}

async function tokenChecking(req,res,next) {
    let decoded = verifyToken(req.headers.token);
    let vehicle_id = req.params.vehicle_id;
    try {
        const vehicleCompany = await Vehicle.findOne({_id: vehicle_id})
        if (decoded.id == vehicleCompany.company) {
            req.decoded = decoded;
            next();
        }else {
            next({status: 404, message: 'You dont have authorized'});
        }
    }catch {
        next({status: 500});
    }
}

module.exports = { 
    tokenChecking,
    authentification,
    userAuthentification
 }