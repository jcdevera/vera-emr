const express = require('express');
const patientController = require('../controller/patientController')
const router = express.Router();

router.get('/', 
  patientController.viewPatients, 
  (req, res) => {
    res.status(200).json(res.locals)
})

router.get('/:id', 
  patientController.getPatientInfo,
  (req,res)=>{
    // console.log("from router.post", res.locals.results)
    res.status(200).json(res.locals.results);
})


router.post('/patient', 
  patientController.createNote,
  patientController.createPatient, 
  (req, res) =>{
    res.status(200).json({})
})

router.put('/newnote', 
  patientController.createNote,
  patientController.updateNote,
  (req, res)=>{
    // console.log('route req body', req.body)
    // console.log('end of middleware');
    res.status(200).json(res.locals.notes)
})

router.put('/delnote',
  patientController.deleteNote,
  patientController.getNotes,
  (req, res) => {
    res.status(200).json(res.locals.newnotes)
  }
)

module.exports = router;