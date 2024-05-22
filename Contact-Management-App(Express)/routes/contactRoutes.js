const express = require('express');
const router = express.Router();
const { getAllContacts, createContact, updateContact, deleteContact, getContact } = require('../controller/tasks');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route('/').get(getAllContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;