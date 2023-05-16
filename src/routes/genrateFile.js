const express = require('express')
const router = express.Router()

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { actions, functions} = require('../controllers/genrateFile')

router.post('/functions', upload.single('file'), functions)
router.post('/actions', actions)

module.exports = router