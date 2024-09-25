const express = require('express');
const { getResources, addResource, deleteResource, editResource } = require('../controllers/resourcesController');
const router = express.Router();

router.get('/', getResources);
router.post('/', addResource);
router.delete('/:id', deleteResource);
router.put('/:id', editResource);

module.exports = router;
