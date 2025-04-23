const express = require('express')
const router = express.Router()

const { addAgent, addLead, getAllAgents, getAllLeads, updateLead, addComments, addNewTag, getFilterLead, getComments } = require('../controllers/lead')


// router.get('/get-leads', addAgent)
router.post('/add-agent', addAgent)
router.post('/add-lead', addLead)

router.post('/add-comment', addComments)
router.post('/add-tag', addNewTag)
router.get('/all-agents', getAllAgents)
router.get('/all-leads', getAllLeads)
router.post('/update-lead', updateLead)
router.get('/get-comments', getComments)

// FILTER
// router.get("/:leadStatus", getLeadByStatus)
router.get('/filter', getFilterLead)
module.exports = router