require('dotenv').config()
const { User, Otp } = require('../Model/model')
const { sign, verify } = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
    try {
        const {
            names,
            email,
            password,
            phoneNumber,
        } = req.body

        const user = new User({
            names,
            email,
            password,
            phoneNumber,
        })

        User.create(user)
        console.log('User is valid');
        res.status(200).json({ message: "User Created Woooooooooooooo" });

    } catch (error) {
        res.status(400).json({ message: error.message })

    }

}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })
        console.log(user._id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        else {
            // create reusable transporter object using the default SMTP transport
            let otp = Math.floor(100000 + Math.random() * 900000);
            console.log(otp);
            const transporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: process.env.MAIL,
                    // pass: 'A4nrm3UE8AzUK6YZxR',
                    pass: process.env.PASSWORD
                }
            });
            // send mail with defined transport object
            let mailOptions = {
                from: '"Tapan Agrawal" <taapanagrawal2002@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'OTP VERIFICATION', // Subject line
                text: `Your OTP for verification is ${otp}`,
                html: `<p>Your OTP for verification is <b>${otp}</b></p>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                const otpData = {
                    userId: user._id
                }
                const expireTime = { expiresIn: '30m' }
                // console.log(otpData);
                const token = sign(
                    otpData,
                    process.env.JWTSECRETTOKEN,
                    expireTime)
                console.log("token", token);
                Otp.create({
                    token: token,
                    otp: otp
                })
                // console.log('Message sent: %s', info.messageId);
                return res.json({
                    token,
                    message: info.messageId,
                    role: user.role
                })
            });
        }

    } catch (error) {

    }
}

// const mail = async (id, email) => {

//     try {
//         // create reusable transporter object using the default SMTP transport
//         let otp = Math.floor(100000 + Math.random() * 900000);
//         console.log(otp);
//         const transporter = nodemailer.createTransport({
//             // host: 'smtp.ethereal.email',
//             host: 'smtp.gmail.com',
//             port: 587,
//             auth: {
//                 user: process.env.MAIL,
//                 // pass: 'A4nrm3UE8AzUK6YZxR',
//                 pass: process.env.PASSWORD
//             }
//         });
//         // send mail with defined transport object
//         let mailOptions = {
//             from: '"Tapan Agrawal" <taapanagrawal2002@gmail.com>', // sender address
//             to: email, // list of receivers
//             subject: 'OTP VERIFICATION', // Subject line
//             text: `Your OTP for verification is ${otp}`,
//             html: `<p>Your OTP for verification is <b>${otp}</b></p>`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             const otpData = {
//                 userId: id
//             }
//             const expireTime = { expiresIn: '30m' }
//             // console.log(otpData);
//             const token = sign(
//                 otpData,
//                 process.env.JWTSECRETTOKEN,
//                 expireTime)
//             console.log("token", token);
//             Otp.create({
//                 token: token,
//                 otp: otp
//             })
//             // console.log('Message sent: %s', info.messageId);
//             res.json({
//                 token,
//                 message: info.messageId
//             })
//         });
//     } catch (error) {

//     }
// }

exports.verifyotp = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log("final token ", token);
    const otpData = await Otp.findOne({ token }).exec();
    const userotp = req.body.otp
    if (otpData) {
        if (userotp == otpData.otp) {
            await Otp.findOneAndDelete({ token })
            res.status(200).json({ message: "user has verified otp now give access" })
        } else {
            res.status(400).json({ message: "You OTP is Not Match" })
        }
    }
    else {
        res.status(400).json({ message: "Your OTP is Expired" })
    }
}
exports.forgotPassword = async (req, res) => {

    const email = req.body.email
    const ID = await User.findOne({ email: email }, '_id')


    const transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.MAIL,
            // pass: 'A4nrm3UE8AzUK6YZxR',
            pass: process.env.PASSWORD
        }
    });
    // send mail with defined transport object
    let mailOptions = {
        from: '"Tapan Agrawal" <taapanagrawal2002@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Forgot password', // Subject line
        text: `your link for reset password: http://localhost:3000/api/updatePassword/${ID._id.toString()}`,

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).json({ message: "mail send successfully" })
    });
    // console.log("wq",ID._id.toString());

}
exports.updatePassword = async (req, res) => {

    const a = req.params.id
    console.log(a);
    const data = await User.findByIdAndUpdate(a,
        { password: req.body.password },
        { new: true }
    )
    console.log(data);
    if (data) {
        res.status(200).json({ message: "updated successfully" })
    }
    else {
        res.status(400).json({ message: "updated not done" })
    }
}



/// crud

exports.getAllCustomers = async (req, res) => {
    const users = await User.find({});
    // console.log(users);
    if (users) {
        res.status(200).json({ users: users })
    }
    else {
        res.status(400).json({ users: "not found" })
    }
    // res.status(200).json(users);
}



exports.getCustomer = async (req, res) => {
    const users = await User.findById(req.params.id);
    // console.log(users);
    if (users) {
        res.status(200).json({ users: users })
    }
    else {
        res.status(400).json({ users: "not found" })
    }
    // res.status(200).json(users);
}

exports.updateCustomer = async (req, res) => {
    const { names, email, phone } = req.body;
    const id = req.params.id
    try {
        const userUpdated = await User.updateOne({
            _id: id
        }, {
            names: names,
            email: email,
            phoneNumber: phone,
        });
        console.log(userUpdated);
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating customer record' });
    }
}

exports.deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCustomer = await User.deleteOne({ _id: id });
        console.log("Deleted customer: ", deletedCustomer);
        res.status(200).send(`Customer with id ${id} deleted successfully`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting customer');
    }
};