const User = require('../Models/users');
const NewsFeeds = require('../Models/newsfeed');
const sendMailer = require('../utility/mailer');
const auth = require('../utility/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findOne, findOneAndUpdate } = require('../Models/users');
const newsfeed = require('../Models/newsfeed');
const { Router } = require('express');




// Add user 
exports.addUserInfo = async (req, res) => {
    try {
        const { userName, email, password, } = req.body;
        if (req.body.email) {
            const otpcode = Math.floor((Math.random() * 10000) + 1);
            await sendMailer(req.body.email, otpcode);
            const hasedpassword = await bcrypt.hashSync(req.body.password, 10)
            const data = await User.create({
                userName,
                email,
                password: hasedpassword,
                otp: otpcode
            })
            data.save();
            return res.status(200).json({
                message: 'Check your Email',
                data
            })
        } else {
            res.status(400).json({
                message: 'No Content'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Check OTP
exports.verifiedUsers = async (req, res) => {
    try {
        let findemail = await User.findOne({ email: req.body.email })
        if (findemail) {
            const data = await User.findOneAndUpdate({ otp: req.body.otp }, { $set: { "verifiedUsers": true } }, {
                new: true,
                useFindAndModify: false
            });
            if (data) {
                res.status(200).json({
                    msg: 'user are active',
                    data
                })
            } else {
                res.status(400).json({
                    msg: 'opps... otp does not matched'
                })
            }
        } else {
            res.status(400).json({
                msg: "invalid email..."
            })
        }

    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Find user by Id
exports.getUserById = async (req, res) => {
    try {
        let data = await User.findOne({ _id: req.body._id }).populate('followers').populate('following').populate('favouritNews');
        if (data?.verifiedUsers === true) {
            res.status(200).json({
                message: 'User are here',
                data
            })
        } else {
            res.status(400).json({
                message: 'no content'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Find All Users
exports.getAllUser = async (req, res) => {
    try {
        let data = await User.find({ verifiedUsers: true }).populate('followers').populate('following')
        if (data) {
            res.status(200).json({
                message: 'Users are here',
                data
            })
        } else {
            res.status(400).json({
                message: 'no content'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Get Following Id
exports.getFollowingId = async (req, res) => {
    let data = await User.findOne({ email: req.body.email }).select('following')
    console.log("hhjkhjkhjkhk", data);
    if (data) {
        res.status(200).json({
            message: 'Following User Id',
            data
        })
    }
}
// User login 
exports.userlogin = async (req, res) => {
    const { email, password } = req.body
    try {
        let data = await User.findOne({ email }).select("+password")
        if (data?.verifiedUsers === true) {
            const isMatch = await bcrypt.compare(password, data.password);
            if (isMatch) {
                const token = jwt.sign(
                    { email: req.body.email },
                    'secret',
                    { expiresIn: "1h" }
                );
                res.status(200).json({
                    status: true,
                    message: 'UserLogin Successfully',
                    user: data,
                    token
                })
            } else {
                res.status(400).json({
                    message: 'Invalid Email or password'
                })
            }
        } else {
            res.status(400).json({
                message: 'Invalid Email or password'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Update User Info
exports.EditUserInfo = async (req, res) => {
    console.log("EDIT USER ========== ", req.body);
    try {
        let data = await User.findOne({ _id: req.body._id })
        const email = req.body.email
        if (data) {
            let data1 = await User.findOneAndUpdate({ _id: req.body._id }, req.body,
                {
                    new: true,
                })
            res.status(200).json({
                message: "updated data",
                data1
            });
        } else {
            res.status(400).json({
                message: 'invalid User OR Email Does bot Change'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Update Password
exports.changePassword = async (req, res) => {
    try {
        let data = await User.findOne({ _id: req.body._id }).select("+password")
        if (data) {
            const hasedpassword = await bcrypt.hashSync(req.body.newpassword, 10)
            let upPassword = await User.findOneAndUpdate({ _id: req.body._id }, { $set: { "password": hasedpassword } },
                {
                    new: true,
                    useFindAndModify: false
                });
            res.status(200).json({
                message: 'password changed successfully...',
                upPassword
            })
        } else {
            res.status(400).json({
                message: 'invalid User'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Forget password
exports.forgetPassword = async (req, res) => {
    try {
        const data = await User.findOne({ email: req.body.email })
        if (data) {
            const otpcode = Math.floor((Math.random() * 10000) + 1);
            await sendMailer(req.body.email, otpcode);
            let updata = await User.findOneAndUpdate({ email: req.body.email }, { $set: { 'otp': otpcode } }, {
                new: true,
                useFindAndModify: false
            })
            res.status(200).json({
                data: updata,
                message: 'Check your email..'
            })
        } else {
            res.status(400).json({
                message: "invalid eamil "
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })

    }
};
// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const data = await User.findOne({ otp: req.body.otp } && { email: req.body.email })
        if (data) {
            const hasedpassword = bcrypt.hashSync(req.body.password, 10);
            const data1 = await User.findOneAndUpdate({ email: req.body.email }, { $set: { 'password': hasedpassword } }, {
                new: true,
                useFindAndModify: false
            })
            if (data1) {
                res.status(200).json({
                    message: 'Password Changed Successfully...',
                    data1
                })
            } else {
                res.status(400).json({
                    message: 'Password Changed Failed...'
                })
            }
        } else {
            res.status(400).json({
                message: 'invalid Email OR OTP'
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
}
// Delete User
exports.deleteUser = async (req, res) => {
    try {
        let data = await User.findOneAndDelete({ _id: req.body._id })
        if (data) {
            res.status(200).json({
                message: "user deleted successfully",
                data
            })
        } else {
            res.status(400).json({
                message: "user deleted failed...",
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// following And followers
exports.followingAndfollwer = async (req, res) => {
    try {
        if (req.body._id !== req.params.id) {
            const user = await User.findById(req.params.id);
            const CuuerntUser = await User.findById(req.body._id);
            if (user && CuuerntUser) {
                const following = await User.findOneAndUpdate({ _id: CuuerntUser._id }, {
                    $push: { "following": user._id }
                },
                    {
                        new: true,
                        useFindAndModify: false
                    })
                const followers = await User.findOneAndUpdate({ _id: user._id },
                    {
                        $push: { "followers": CuuerntUser._id }

                    },
                    {
                        new: true,
                        useFindAndModify: false
                    }
                );
                res.status(201).json({
                    message: 'Following successfully...',
                    Following_data: following,
                    Follower_data: followers
                })
            } else res(400).json({
                message: 'user not found'
            })
        } else {
            res.status(400).json({
                message: "you cant follow your self"
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Unfollowing
exports.unFollowingAndFollwer = async (req, res) => {
    try {
        if (req.body._id !== req.params.id) {
            const user = await User.findById(req.params.id);
            const CuuerntUser = await User.findById(req.body._id);
            if (user && CuuerntUser) {
                const unfollow = await User.findOneAndUpdate({ _id: CuuerntUser._id }, {
                    $pull: { "following": user._id }
                },
                    {
                        new: true,
                        useFindAndModify: false
                    })
                const unfollower = await User.findOneAndUpdate({ _id: user._id },
                    {
                        $pull: { "followers": CuuerntUser._id }

                    },
                    {
                        new: true,
                        useFindAndModify: false
                    }
                );
                res.status(201).json({
                    message: 'unFollowing successfully...',
                    unfollowing_data: unfollow,
                    unfollowers_data: unfollower
                })
            } else (res.json({
                message: 'user not found'
            }))
        } else {
            res.status(400).json({
                message: "you cant unfollow your self"
            })
        }
    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
//Add Following Faviourt News
exports.followingfaviourtNews = async (req, res) => {
    let commingNews = req.body.data
    let commingSector = req.body.sector
    let key = `${commingSector}.data._id`
    console.log("KEY ========= ", key);
    // try {
    //     let findNews = await NewsFeeds.findOne({ "sports.data": { $elemMatch: { "likeCount": 4 } } })
    //     console.log("FINDNEWS ============ ", findNews);
    // } catch (err) {
    //     res.status(400).json({ msg: "Making News Favourit Fail" })
    // }
    try {
        let findUser = await User.findOneAndUpdate({ email: req.body.email }, { $push: { "favouritNews": commingNews } }, { new: true })
        res.status(200).json({ msg: "New Added to Favourit Success", data: findUser })
    } catch (err) {
        res.status(400).json({ msg: "Error While Added News to Favourit", err })
    }
};
// UnFollowing Faviourt News
exports.unfollowingfaviourtNews = async (req, res) => {
    try {
        let data = await User.findById({ _id: req.body._id });
        let newsdata = await NewsFeeds.find();
        if (data && (newsdata[0].business.id == req.body.newsid)) {
            const busData = await User.findOneAndUpdate({ email: data.email }, { $pull: { "favouritNews": newsdata[0].business.id } }, {
                new: true,
                useFindAndModify: false
            });
            console.log(busData);
            if (busData) {
                res.status(200).json({
                    message: 'unfollow  Business News',
                    busData
                })
            } else {
                res.status(400).json({
                    message: "unfollow busniess are faild"
                })
            }
        } else if (data && (newsdata[0].entertainment.id == req.body.newsid)) {
            const entData = await User.findOneAndUpdate({ email: data.email }, { $pull: { "favouritNews": newsdata[0].entertainment.id } }, {
                new: true,
                useFindAndModify: false
            });
            if (entData) {
                res.status(200).json({
                    message: 'unFoolow Entertainment News',
                    entData
                })
            } else {
                res.status(400).json({
                    message: " unfollow  Entertainment news are failed"
                })
            }
        }
        else if (data && (newsdata[0].general.id == req.body.newsid)) {
            const genData = await User.findOneAndUpdate({ email: data.email }, { $pull: { "favouritNews": newsdata[0].general.id } }, {
                new: true,
                useFindAndModify: false
            });
            if (genData) {
                res.status(200).json({
                    message: ' unfollow General News',
                    genData
                })
            } else {
                res.status(400).json({
                    message: " unfollow  General news are failed"
                })
            }
        } else if (data && (newsdata[0].health.id == req.body.newsid)) {
            const helData = await User.findOneAndUpdate({ email: data.email }, { $pull: { "favouritNews": newsdata[0].health.id } }, {
                new: true,
                useFindAndModify: false
            });
            if (helData) {
                res.status(200).json({
                    message: 'unfollow  Health News',
                    helData
                })
            } else {
                res.status(400).json({
                    message: " unfollow  Health news are failed"
                })
            }
        } else if (data && (newsdata[0].science.id == req.body.newsid)) {
            const sciData = await User.findOneAndUpdate({ email: data.email }, { $pull: { "favouritNews": newsdata[0].science.id } }, {
                new: true,
                useFindAndModify: false
            });
            if (sciData) {
                res.status(200).json({
                    message: 'unfollow  Science News',
                    sciData
                })
            } else {
                res.status(400).json({
                    message: " unfollow Science news are failed"
                })
            }
        } else if (data && (newsdata[0].sports.id == req.body.newsid)) {
            const sptData = await User.findOneAndUpdate({ email: data.email }, { $pull: { "favouritNews": newsdata[0].sports.id } }, {
                new: true,
                useFindAndModify: false
            });
            if (sptData) {
                res.status(200).json({
                    message: 'unfollow  Sports News',
                    sptData
                })
            } else {
                res.status(400).json({
                    message: " unfollow  Sports news are failed"
                })
            }
        } else if (data && (newsdata[0].technology.id == req.body.newsid)) {
            const tecData = await User.findOneAndUpdate({ email: data.email }, { $pull: { "favouritNews": newsdata[0].technology.id } }, {
                new: true,
                useFindAndModify: false
            });
            if (tecData) {
                res.status(200).json({
                    message: 'unfollow  Tecnology News',
                    tecData
                })
            } else {
                res.status(400).json({
                    message: "  Tecnology news are failed"
                })
            }
        } else {
            res.status(400).json({
                message: 'no content are found'
            })
        }

    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })
    }
};
// Add Keyword
exports.AddkeyWords = async (req, res) => {
    try {
        let data = await User.findOneAndUpdate({ email: req.body.email }, { $push: { "keyWords": req.body.keyWords } },
            {
                new: true
            })
        if (data) {
            res.status(200).json({
                message: "keyword added",
                data
            })
        } else {
            res.status(400).json({
                message: "Keyword added Failed"
            })
        }

    } catch (error) {
        res.status(400).json({
            Error_Message: error
        })

    }
}

// Favourit Categories :

exports.addFavouritCat = async (req, res) => {
    let { name, email } = req.body
    let key = `categories.${name}`
    console.log("COMMING BODY ======= ", name, email);
    console.log("CREATED KEY ======= ", key);
    try {
        let data = await User.findOne({ email: email })
        console.log("FIND USER DATA ===== ", data);
        if (data) {
            let cate = data.categories
            let newCate = { ...cate, [name]: cate[name] == true ? false : true }
            // await User.findOneAndUpdate({ email: email }, { $set: { [key]: data.categories[name] == true ? false : true } }, { new: true })
            await User.findOneAndUpdate({ email: email }, { $set: { "categories": newCate } }, { new: true })
                .then((succ) => {
                    res.status(200).json({ message: "Favourit Category Added Success", data: succ })
                }).catch((error) => {
                    res.status(400).json({ message: "Cant't changing Favourit Category", error })
                })
        } else {
            res.status(400).json({ message: "Cant't Find User" })
        }
    } catch (err) {
        console.log("CATCH ERROR ========= ", err);
        res.status(400).json({ message: "Error to find user", err })
    }
}


