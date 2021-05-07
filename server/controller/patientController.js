const Patient = require('../models/patient.model');
const Visit = require('../models/visit.model')

const patientController = {

  viewPatients(req, res, next){

    Patient.find({}, (err, result) => {
      // console.log(result)
      if(err){
        res.status(400).send("Error in viewPatients: ", err);
        return next(err);
      }
      res.locals = result;
      return next();
    })
  },

  getPatientInfo(req, res, next){
    const {id} = req.params;
    console.log(id);
    Patient.findOne({_id: id}, (err, result) => {
      if(err){
        next(console.log("Error in getPatientInfo: ", err))
      }
      // console.log('from getpatient info', result)
      result.notes = result.notes.sort((a, b) => b.created_on - a.created_on)
      res.locals.results = result;
      next();
    })
   
  },

  createPatient (req, res, next) {
    const newPatient = req.body;
   
    console.log(newPatient)
    // console.log(result)
    Patient.create(newPatient, (err, result)=>{
      if(result){
        return next();
      }
      if(err){
        res.status(400).send("Error ")
        next(err)
      }
    })
  },

  createNote(req, res, next){
    // console.log('create note reqbody ', req.body)
    const {notes} = req.body;
    // console.log('createnote notes: ', notes)
    
    const date = new Date;
    Visit.create({created_on: date, notes: notes}, (err, result)=>{
      if(result){
        // console.log(result)
        req.body.notes = [result];
        return next();
      }
      if(err){
        res.status(400).send("Error in createNote: ", err)
        next(err);
      }
    })
  },

  updateNote (req, res, next) {
    const {notes, id} = req.body;
    // console.log(req.body)
    Patient.findOneAndUpdate({_id: id}, {
      $push: {notes: notes}},
      {new: true },
      (err, result)=>{
        if(err){
          res.status(400).send("Error in update note: ", err);
          return next(err)
        }
        console.log('update note ', result)
        const sorted = result.notes.sort((a, b) => b.created_on - a.created_on)
        res.locals.notes = sorted;
        next();
      })
  },

  deleteNote (req, res, next){
    const {noteId, id} = req.body;
    console.log("in del note, ", noteId)
    
    
    Patient.findOne({_id: id}, "notes",
      (err, result)=>{
        console.log(result.notes)
        const removeIndex = result.notes.map((item)=>{
          return item._id
        }).indexOf(noteId)
        
        result.notes.splice(removeIndex, 1)
        // console.log(result.notes);
        
        Patient.findOneAndUpdate({_id: id}, {notes: result.notes}, {new: true},
          (err, newResult)=>{
            res.locals.newnotes = newResult.notes;
            next();
          })
      })
      // { "$pull": {
      //   "notes": {"_id": noteId}
      // }
      // },
      // (err, result)=>{
      //   if(err){
      //     res.status(400).send("Error in del notes: ", err)
      //     return next(err)
      //   }
      //   console.log(result);
      //   return next();
      // })
  },

  getNotes(req, res, next){
    const {id} = req.body;
    console.log(id);
    Patient.findOne({_id: id}, (err, result) => {
      if(err){
        next(console.log("Error in getPatientInfo: ", err))
      }
      // console.log('from getpatient info', result)
      res.locals.results = result.notes.sort((a, b) => b.created_on - a.created_on)
      next();
    })

  },

};
module.exports = patientController;