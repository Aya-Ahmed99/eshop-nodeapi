const {body , param , query} = require("express-validator");


module.exports.addCategoryValidation = [

    body("name").isAlpha().withMessage("Name is not vaild"),

];

module.exports.idCaregoryValidation = [
    param("id").isInt().withMessage("category id should be object id ")
];