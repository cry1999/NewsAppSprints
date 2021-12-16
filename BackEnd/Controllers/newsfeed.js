const NewsFeeds = require('../Models/newsfeed');
const UserModel = require("../Models/users")
const NewsApi = require('newsapi');
const newsapi = new NewsApi('7bd8d7ece74c4f0998c43b0e2329b1c8');
const shortid = require('shortid')


// Business News
exports.businessNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.everything({
            q: 'business',
            language: 'en',
        })
        let arr1 = data.articles
        let newArry1 = []

        await arr1.map((art) => {
            newArry1.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
        })

        if (data1) {
            if (data1.business.data.length >= 1) {
                let createdTime = new Date(data1.business.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                //let createTimeEpoch = createdTime.getTime()
                //let currentTimeEpoch = CurrentTime.getTime()
                //const threehoursDif = currentTimeEpoch - createTimeEpoch
                //if(threehoursDif > (parseFloat(createTimeEpoch) + 180000))
                if (hours >= 3) {

                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "business.data": newArry1, "business.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ.business })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.business })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "business.data": newArry1 } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ.business })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.everything({
                q: 'business',
                language: 'en',
            })

            let array = data.articles
            let newArry = []
            await array.map((art) => {
                newArry.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
            })

            let savingBuss = new NewsFeeds({
                business: {
                    data: newArry
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ.business })
                }).catch((err) => {
                    res.status(400).json({ msg: "Data Saved to BackEnd & Received FAILED", err })
                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Tecnology News
exports.TecnologyNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.everything({
            q: 'technology',
            language: 'en',
        })
        let arr1 = data.articles
        let newArry1 = []

        await arr1.map((art) => {
            newArry1.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
        })

        if (data1) {
            if (data1.technology.data.length >= 1) {
                let createdTime = new Date(data1.technology.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {

                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "technology.data": newArry1, "technology.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ.technology })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.technology })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "technology.data": newArry1 } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ.technology })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.everything({
                q: 'technology',
                language: 'en',
            })

            let array = data.articles
            let newArry = []
            await array.map((art) => {
                newArry.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
            })

            let savingBuss = new NewsFeeds({
                technology: {
                    data: newArry
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ.technology })
                }).catch((err) => {
                    res.status(400).json({ msg: "Data Saved to BackEnd & Received FAILED", err })
                })
        }
    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// General News
exports.generalNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.everything({
            q: 'general',
            language: 'en',
        })
        let arr1 = data.articles
        let newArry1 = []

        await arr1.map((art) => {
            newArry1.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
        })
        if (data1) {
            if (data1.general.data.length >= 1) {
                let createdTime = new Date(data1.general.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {

                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "general.data": newArry1, "general.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ.general })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.general })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "general.data": newArry1 } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ.general })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.everything({
                q: 'general',
                language: 'en',
            })

            let array = data.articles
            let newArry = []
            await array.map((art) => {
                newArry.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
            })

            let savingBuss = new NewsFeeds({
                general: {
                    data: newArry
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ.general })
                }).catch((err) => {
                    res.status(400).json({ msg: "Data Saved to BackEnd & Received FAILED", err })
                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Health News
exports.healthNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.everything({
            q: 'health',
            language: 'en',
        })
        let arr1 = data.articles
        let newArry1 = []

        await arr1.map((art) => {
            newArry1.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
        })
        if (data1) {
            if (data1.health.data.length >= 1) {
                let createdTime = new Date(data1.health.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {

                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "health.data": newArry1, "health.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ.health })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.health })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "health.data": newArry1 } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ.health })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.everything({
                q: 'health',
                language: 'en',
            })

            let array = data.articles
            let newArry = []
            await array.map((art) => {
                newArry.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
            })

            let savingBuss = new NewsFeeds({
                business: {
                    data: newArry
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ.health })
                }).catch((err) => {
                    res.status(400).json({ msg: "Data Saved to BackEnd & Received FAILED", err })
                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Sports News
exports.sportsNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.everything({
            q: 'sports',
            language: 'en',
        })
        let arr1 = data.articles
        let newArry1 = []

        await arr1.map((art) => {
            newArry1.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
        })
        if (data1) {
            if (data1.sports.data.length >= 1) {
                let createdTime = new Date(data1.sports.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "sports.data": newArry1, "sports.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ.sports })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.sports })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "sports.data": newArry1 } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ.sports })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.everything({
                q: 'sports',
                language: 'en',
            })

            let array = data.articles
            let newArry = []
            await array.map((art) => {
                newArry.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
            })

            let savingBuss = new NewsFeeds({
                sports: {
                    data: newArry
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ.sports })
                }).catch((err) => {
                    res.status(400).json({ msg: "Data Saved to BackEnd & Received FAILED", err })
                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Science News
exports.scienceNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.everything({
            q: 'science',
            language: 'en',
        })
        let arr1 = data.articles
        let newArry1 = []

        await arr1.map((art) => {
            newArry1.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
        })
        if (data1) {
            if (data1.science.data.length >= 1) {
                let createdTime = new Date(data1.science.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "science.data": newArry1, "science.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ.science })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.science })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "science.data": newArry1 } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ.science })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.everything({
                q: 'science',
                language: 'en',
            })

            let array = data.articles
            let newArry = []
            await array.map((art) => {
                newArry.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
            })

            let savingBuss = new NewsFeeds({
                science: {
                    data: newArry
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ.science })
                }).catch((err) => {
                    res.status(400).json({ msg: "Data Saved to BackEnd & Received FAILED", err })
                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
};
// Entertainment News
exports.entertainmentNews = async (req, res) => {
    try {
        let data1 = await NewsFeeds.findOne({ name: "allNews" })
        const data = await newsapi.v2.everything({
            q: 'entertainment',
            language: 'en',
        })
        let arr1 = data.articles
        let newArry1 = []

        await arr1.map((art) => {
            newArry1.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
        })
        if (data1) {
            if (data1.entertainment.data.length >= 1) {
                let createdTime = new Date(data1.entertainment.createdAt);
                let CurrentTime = new Date();
                const hours = parseInt(Math.abs(CurrentTime - createdTime) / (1000 * 60 * 60) % 24);
                if (hours >= 3) {
                    await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "entertainment.data": newArry1, "entertainment.createdAt": Date.now() } },
                        { new: true })
                        .then((succ) => {
                            res.status(200).json({ msg: "Data REPLACED to BackEnd & Received", data: succ.entertainment })
                        }).catch((err) => {
                            res.status(400).json({ msg: "Data REPLACED to BackEnd & Received FAIL", err })
                        })
                } else {
                    res.status(200).json({ msg: "Data Received BackEnd", data: data1.entertainment })
                }
            } else {
                await NewsFeeds.findOneAndUpdate({ name: "allNews" }, { $set: { "entertainment.data": newArry1 } },
                    { new: true })
                    .then((succ) => {
                        res.status(200).json({ msg: "Data UPDATED to BackEnd & Received", data: succ.entertainment })
                    }).catch((err) => {
                        res.status(400).json({ msg: "Data UPDATED to BackEnd & Received FAIL", err })
                    })
            }
        } else {
            const data = await newsapi.v2.everything({
                q: 'entertainment',
                language: 'en',
            })

            let array = data.articles
            let newArry = []
            await array.map((art) => {
                newArry.push({ ...art, _id: shortid.generate(), like: false, likeCount: 0 })
            })

            let savingBuss = new NewsFeeds({
                entertainment: {
                    data: newArry
                },
            })
            await savingBuss.save()
                .then((succ) => {
                    res.status(200).json({ msg: "Data Saved to BackEnd & Received", data: succ.entertainment })
                }).catch((err) => {
                    res.status(400).json({ msg: "Data Saved to BackEnd & Received FAILED", err })
                })
        }

    } catch (error) {
        console.log('Something Wents Wrongs', error);
    }
}

// Selected News
exports.selectedNews = async (req, res) => {
    try {
        let allNews = await NewsFeeds.findOne({ name: "allNews" })
        let userData = await UserModel.findOne({ email: req.body.email })
        let userCat;
        let selectedData = []
        if (userData) {
            userCat = userData.categories

            if (userCat.business == true) {
                selectedData.push(allNews.business.data)
            }
            if (userCat.entertainment == true) {
                selectedData.push(allNews.entertainment.data)
            }
            if (userCat.general == true) {
                selectedData.push(allNews.general.data)
            }
            if (userCat.health == true) {
                selectedData.push(allNews.health.data)
            }
            if (userCat.science == true) {
                selectedData.push(allNews.science.data)
            }
            if (userCat.sports == true) {
                selectedData.push(allNews.sports.data)
            }
            if (userCat.technology == true) {
                selectedData.push(allNews.technology.data)
            }

            res.status(200).json({ msg: "Selected New Received", data: selectedData })

        } else {
            res.status(400).json({ msg: "Invalid UserName or Email" })
        }
    } catch (err) {
        res.status(400).json({ msg: "Fail to Fetch Selected News or UserInfo", err })
    }
}