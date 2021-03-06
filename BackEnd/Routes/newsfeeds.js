const express = require('express');
const { businessNews, generalNews, TecnologyNews, entertainmentNews, scienceNews, healthNews, sportsNews, selectedNews, } = require('../Controllers/newsfeed');
const router = express.Router();
const auth = require('../utility/auth');

router.post('/businessnews', businessNews);
router.post('/generalnews', generalNews);
router.post('/tecnologynews', TecnologyNews);
router.post('/entertainmentnews', entertainmentNews);
router.post('/sciencenews', scienceNews);
router.post('/healthnews', healthNews);
router.post('/sportsnews', sportsNews);
router.post('/selectnews', selectedNews)



module.exports = router;