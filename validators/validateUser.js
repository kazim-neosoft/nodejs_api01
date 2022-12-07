const {check, validationResult} = require('express-validator');
exports.validateUser=[
    check("name")
    .isLength({ min: 3 ,max:10})
    .withMessage("the name must have minimum length of 3 chars and max 10 chars")
    .trim(), 
    check('city')
    .contains()
    .withMessage("City name cannot be empty"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];

/*
const validation=validations=>{
  return async (req,res,next)=>{
  await Promise.all(validations.map(validation=>validation.run(req)))
  const errors=validationResult(req);
  if(errors.isEmpty()){
    next()
  }
  res.status(422).json(error:1,errors:errors.array())  
}
}


*/