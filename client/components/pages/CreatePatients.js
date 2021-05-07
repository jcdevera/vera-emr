
import React, {Component} from 'react';

class CreatePatients extends Component{
  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      gender: '',
      dateOfBirth: '',
      notes: ''
    }
  }
  firstNameOnChange = (e) => {
    this.setState({first_name: e.target.value})
  }
  lastNameOnChange = (e) => {
    this.setState({last_name: e.target.value})
  }
  genderOnChange = (e) => {
    this.setState({gender: e.target.value})
  }
  dateOfBirthOnChange = (e) => {
    this.setState({dateOfBirth: e.target.value})
  }
  notesOnChange = (e) => {
    this.setState({notes: e.target.value})
  }
  savePatient = (e) =>{
    e.preventDefault();
    
    const pData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      dateOfBirth: this.state.dateOfBirth,
      notes: this.state.notes
    }
    console.log(pData)
    fetch('/api/patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(pData)
    })
      .then(resp => resp.json())
      .catch(err => console.log('Create patient fetch /api/patient: ERROR ', err))
      
    this.setState({
      first_name: '',
      last_name: '',
      gender: '',
      dateOfBirth: '',
      notes: ''
    });
  };

  render(){
    return(
      <div className="create-patient">
        <strong><h1>Create Patient Record</h1></strong>
        <div className="create">
          <label className="createlabel">First Name</label>
          <input type="text" className="inputfields" 
            id="firstname" 
            value={this.state.first_name}
            onChange={this.firstNameOnChange}
          />  
          <label className="createlabel">Last Name</label>
          <input type="text" className="inputfields" 
            id="lastname"
            value={this.state.last_name}
            onChange={this.lastNameOnChange}
          />
          <label className="createlabel">Sex/Gender</label>
          <select className="inputfields" id="sexgender" 
            value={this.state.gender} 
            onChange={this.genderOnChange}>
              <option value='Select'>Select</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Transgendered'>Transgendered</option>
              <option value='Gender Queer'>Gender Queer</option>
              <option value='Decline to answer'>Decline to answer</option>
          </select>
          <label className="createlabel">Date of Birth</label>
          <input type="text" className="inputfields" 
            id="dateOfBirth"
            value={this.state.dateOfBirth}
            onChange={this.dateOfBirthOnChange}
          />
          <label className="createlabel">Notes</label>
          <textarea className="inputfields" id="createnotes" value={this.state.notes} onChange={this.notesOnChange}></textarea>
          
        </div>
        <div className="button">
          <button className="btn-create-patient" onClick={this.savePatient}>Submit</button>
        </div>
      </div>
    )
  }
}
export default CreatePatients;