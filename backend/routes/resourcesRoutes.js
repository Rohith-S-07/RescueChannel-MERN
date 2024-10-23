//resourcesRoutes
const express = require('express');
const { getResources, addResource, editResource, updateResource, addInspectionLog } = require('../controllers/resourcesController');
const router = express.Router();

router.get('/', getResources);
router.post('/', addResource);
router.put('/:id', editResource);
router.put('/:id', updateResource);
router.post('/:id/inspection', addInspectionLog);


module.exports = router;
