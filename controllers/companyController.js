const Company = require('../models/company');
const { hashPass, checkPass, generateToken, verifyToken } = require('../helpers');

class CompanyController {

    static readAll(req,res,next) {
        Company.find({})
            .then(function(companys) {
                res.status(200).json(companys)
            })
            .catch(next)
    };

    static create(req,res,next) {
        let { email, password, name, address, phone, domicile, province, director_name } = req.body;
        Company.create({
            name,
            email,
            address,
            password,
            phone,
            domicile,
            director_name,
            province
        })
        .then(function(company) {
            res.status(202).json({message: 'Company success register'})
        })
        .catch(next)
    };

    static login(req,res,next) {

        let { password, email } = req.body;
        Company.findOne({email})
            .then(function(company) {
                if (company && checkPass(password, company.password)) {
                    let payload = {
                        id: company.id,
                    }
                    let token = generateToken(payload);
                    res.status(201).json({message: `Welcome ${company.name}`, token})
                }else {
                    next({message: 'Invalid email / password'})
                }
            })
            .catch(next)
    };

};

module.exports = CompanyController;
