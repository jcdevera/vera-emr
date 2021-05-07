import React, {Component} from 'react';
import { useHistory } from "react-router-dom";
import moment from 'moment';

class PatientInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      id: '',
      first_name: '',
      last_name: '',
      gender: '',
      dateOfBirth: '',
      notes: [],
      newNoteEntry: '',
    }
    this.saveNote = this.saveNote.bind(this);
    this.notesOnChange = this.notesOnChange.bind(this)
    this.deleteNote = this.deleteNote.bind(this);
  }
  componentDidMount(){
    const result = window.location.href.slice(window.location.href.indexOf('i/') + 2);
    fetch(`/api/${result}`)
    .then(response => response.json())
    .then(data => {
      console.log("from fetch,", data)
      this.setState({
        id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        notes: data.notes,
      })
    })
    .catch(err => console.log('Patient Info fetch /api/:id: ERROR ', err))
  };

  notesOnChange = (e) => {
    this.setState({newNoteEntry: e.target.value})
  }
  saveNote = (e) =>{
    e.preventDefault();
    this.setState({newNoteEntry: ''});

    fetch('/api/newnote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        notes: this.state.newNoteEntry,
        id: this.state.id
      })
    })
      .then(res => res.json())
      .then(data =>{
        console.log('from fetch/post',data)
        this.setState({
          notes: data
        })
        console.log("state after setState", this.state.notes)
      })
      .catch(err=>console.log(err))
    
  }

  deleteNote = (noteId) => {
    console.log('note to delete:', noteId)
    fetch('/api/delnote',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        noteId: noteId, 
        id: this.state.id
      })
    })
      .then(res => res.json())
      .then(dataFromPut => {
        console.log("data coming back, ", dataFromPut)
        this.setState({notes: dataFromPut})
        console.log("state after delete", this.state.notes)
      })
      .catch(err => console.log(err))
  }

  render(){
    const age = moment().diff(new Date(this.state.dateOfBirth), 'years');
    // const test = notes;
    const entries = this.state.notes.map(entry => {
      return (
          <div className="noteentry">
            <strong>{moment(entry.created_on).format('MMMM Do YYYY, h:mm:ss a')}<br/></strong>
            {entry.notes}
            <button className="deleteNote" onClick={() => this.deleteNote(entry._id)}>Delete Note</button>
          </div> 
      )
    })
    return(
      <div className="pinfo-header">
        <strong><h1>Patient Info</h1></strong>
        <div className="patientinfo-container">
          <div>
            <table className="patientInfo">
              <tbody>
              <tr className="trow">
                <td className="tlabel">First Name: </td>
                <td className="tdata">{this.state.first_name}</td>
              </tr>
              <tr>
                <td className="tlabel">Last Name: </td>
                <td className="tdata">{this.state.last_name}</td>
              </tr>
              <tr>
                <td className="tlabel">Date of Birth: </td>
                <td className="tdata">{this.state.dateOfBirth}</td>
              </tr>
              <tr>
                <td className="tlabel">Age: </td>
                <td className="tdata">{age}</td>
              </tr>
              <tr>
                <td className="tlabel">Gender: </td>
                <td className="tdata">{this.state.gender}</td>
              </tr>
              </tbody>
              
            </table>
            <textarea 
              id="createnotes" 
              className="newnote" 
              placeholder="Create new note entry?" 
              value={this.state.newNoteEntry}
              onChange={this.notesOnChange}>
            </textarea>
            <button className="btn-update-note" onClick={this.saveNote}>Submit</button>
          </div>
          <div className="notescontainer">
            {entries}
          </div>
        </div>
      </div>
    )
  }
}
export default PatientInfo;