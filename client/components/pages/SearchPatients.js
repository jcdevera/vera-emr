import React, {Component} from 'react';

class SearchPatients extends Component {
  constructor(props){
    super(props);
    this.state={
      searchPatient: "",
    }
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.getPatients = this.getPatients.bind(this);
    
  }
  componentDidMount (){
    this.getPatients();
  }
  onChangeSearch = (e) =>{
    const searchPatient = e.target.value;

    this.state({
      searchPatient: searchPatient,
    });
  }
  getPatients = () =>{

  }

  render(){
    return(
      <div className="view-patient">
        <div>
          <strong><h1>Search</h1></strong>
          <div className="searchcontainer">
            <input type="text" className="search"></input>
            {/* results will be displayed here */}
          </div>
        </div>
      </div>
    )
  }
}
export default SearchPatients;