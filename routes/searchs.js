const {Router} = require('express');
const { check } = require('express-validator');

const { searchTerm } = require('../controllers/searchs');



const router = Router();

router.get('/:collection/:term', searchTerm)



module.exports=router;
