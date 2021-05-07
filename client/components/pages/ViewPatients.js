import React, {Component} from 'react';
import PatientTable from './PatientTable';

class ViewPatients extends Component {
  constructor(props){
    super(props);
    this.state={
      patientList: [],
    }
    this.getPatients = this.getPatients.bind(this);
    
  }
  componentDidMount (){
    this.getPatients();
  }

  getPatients = () =>{
    fetch('/api/', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON'
      },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.setState({patientList: data})
      })
      .catch(err => console.log('Create patient fetch /api/patient: ERROR ', err))
  }

  render(){
    return(
      <div className="view-patient">
        <strong><h1>View Patients</h1></strong>
        <PatientTable data={this.state.patientList}/>
      </div>
    )
  }
}
export default ViewPatients;