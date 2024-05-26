const express = require('express');
const {dashboard, dashboardUpdateNote, dashboardDeleteNode, dashboardViewNote, dashboardAddNote, dashboardAddNoteSubmit, dashboardSearch, dashboardSearchSubmit} = require('../controllers/dashboardController');
const router = express.Router();

router.route('/dashboard').get(dashboard);
router.route('/dashboard/item/:id').get(dashboardViewNote).put(dashboardUpdateNote);
router.route('/dashboard/item-delete/:id').delete(dashboardDeleteNode);
router.route('/dashboard/add').get(dashboardAddNote).post(dashboardAddNoteSubmit);
router.route('/dashboard/search').get(dashboardSearch).post(dashboardSearchSubmit);

module.exports = router;

