import React, { Component } from 'react';
import '../css/w3.css';
import axios from 'axios';
class CreateDepartment extends Component {
     constructor(props) {
        super(props);
        this.state = {
            universities: [],
            faculties : [],
            DepartmentName: '',
            DepartmentAddress: '',
            FkFacultyId:''
        };
    }
    submitHandler(e) {
        e.preventDefault();
        console.log(this.state);// Doğru Geliyor.
          var newDepartment = {
            DepartmentName: this.state.DepartmentName,
            DepartmentAddress: this.state.DepartmentAddress,
            FkFacultyId:this.state.FkFacultyId
        }
          console.log(newDepartment);
        axios.post('http://unieventorapi.azurewebsites.net/api/DepartmentApi',newDepartment).then((response)=>{
           console.log(response);
            alert('Fakülte Eklendi');
        }).catch((error)=>{console.log(error)})
        alert('Bölüm Ekle');
        // Fill User Information from api 
    }
     componentDidMount() {

            axios.get('http://unieventorapi.azurewebsites.net/api/UniversityApi').then((response)=>{
                this.setState({universities:response.data});
            }).catch((error)=>{
                console.log(error);
            });
            axios.get('http://unieventorapi.azurewebsites.net/api/FacultyApi').then((response)=>{
                this.setState({faculties:response.data});
            }).catch((error)=>{
                console.log(error);
            });

    }

    handleUniversityIdChange(event) {
        
        var UniversityId = event.target.value;
         axios.get('http://unieventorapi.azurewebsites.net/api/FacultyApi?UniId='+UniversityId).then((response)=>{
                this.setState({faculties:response.data});
            }).catch((error)=>{
                console.log(error);
            });
    }
    handleDepartmentNameChange(event) {
        var DepartmentName = event.target.value;
        this.setState({DepartmentName});
    }
    handleDepartmentAddressChange(event) {
        var DepartmentAddress = event.target.value;
        this.setState({DepartmentAddress});
    }
    handleFkFacultyIdChange(event) {
        var FkFacultyId = event.target.value;
        this.setState({FkFacultyId});
    }


    render() {
          var resizenone={
           resize : 'none'
       }
       return (
           <div>
                  <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

             <h2>Bölüm Tanımlama</h2>
             <div className="w3-row w3-section">
                <div className="w3-half w3-container">
                    <select className="w3-select w3-border w3-padding" name="option"  onChange={this.handleUniversityIdChange.bind(this)}>
                        <option value="" disabled selected>Üniversite Seç</option>
                       {this.state.universities.map((item)=>{
                            return <option key={item.UniversityId} value={item.UniversityId}>{item.UniversityName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="w3-row w3-section">
                <div className="w3-container w3-half">
                    <select className="w3-select w3-border w3-padding" name="option" onChange={this.handleFkFacultyIdChange.bind(this)}>
                        <option value="" disabled selected>Fakülte Seç</option>
                          {this.state.faculties.map((item)=>{
                            return <option key={item.FacultyId} value={item.FacultyId}>{item.FkUniversityId} - {item.FacultyName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="w3-row w3-section">
                <div className="w3-container w3-half">
                    <input className="w3-input w3-border w3-padding" type="text" onChange={this.handleDepartmentNameChange.bind(this)} placeholder="Bölüm Adı" id="txtUniName"/>
                </div>
            </div>
            <div className="w3-row w3-section">
                <div className="w3-container w3-half">
                        <textarea className="w3-input w3-border w3-padding " style={resizenone} onChange={this.handleDepartmentAddressChange.bind(this)}   placeholder="Bölüm Adres"></textarea>
                </div>
            </div>
            <div className="w3-row ">
                <div className="w3-half">
                    <div className="w3-container w3-right">
                        <button className="w3-btn w3-ripple w3-green">Bölümü Ekle</button>
                    </div>
                </div>
            </div>
            </form> 
           </div>
       );
    }
}

export default CreateDepartment;