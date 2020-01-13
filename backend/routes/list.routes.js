const express = require('express');
const router = express.Router();

const listCtrl = require('../controllers/list.controller');

router.get('/', listCtrl.getLists);
router.post('/', listCtrl.createList);
router.get('/:id', listCtrl.getList);
router.get('/load/:key', listCtrl.getListByKey);
router.put('/:id', listCtrl.editList);
router.delete('/:id', listCtrl.deleteList);

module.exports = router;