const router=require('express').Router()
const {register,login,mail,verifyotp,forgotPassword,updatePassword,getAllCustomers,getCustomer,updateCustomer,deleteCustomer}=require('../Controller/control')
const { check} = require('express-validator');


router.post('/register'
// ,[
//     check('names')
//         .notEmpty()
//         .withMessage('name should not be empty')
//         .isLength({min:3})
//         .withMessage('name should not be less than three letters'),
//     check('email')
//     .notEmpty()
//      .withMessage('email should not be empty')
//      .isLength({min:3})
//     .withMessage('email should not be less than three letters')
    


// ]
,register)
router.post('/login',login)

// router.get('/mail',mail)
router.post('/verifyotp',verifyotp)

router.post('/forgotPassword',forgotPassword)
router.post('/updatePassword/:id',updatePassword)




//crud api
router.get('/getAllCustomers',getAllCustomers)
router.get('/getCustomer/:id',getCustomer)
router.post('/updateCustomer/:id',updateCustomer)
router.post('/deleteCustomer/:id',deleteCustomer)




module.exports=router