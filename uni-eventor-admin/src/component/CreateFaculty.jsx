import React, { Component } from 'react';
import '../css/w3.css';
import axios from 'axios';
import * as AuthModule from '../App.Auth';


class CreateFaculty extends Component {
     constructor(props) {
        super(props);
        this.state = {
            universities:[],
            FacultyName: '',
            FacultyAddress: '',
            FkUniversityId:''
        };
    }

    submitHandler(e) {
        e.preventDefault(); 
       AuthModule.login('testuser', 'Cem.123', () => {
                alert('Login Success');
            }, (error) => {
                alert('Login Error');
            });
        var newFaculty = {
            FacultyName: this.state.FacultyName,
            FacultyAddress: this.state.FacultyAddress,
            FkUniversityId:this.state.FkUniversityId
        }
          console.log(newFaculty);
        axios.post('http://unieventorapi.azurewebsites.net/api/FacultyApi',newFaculty).then((response)=>{
           console.log(response);
            alert('Fakülte Eklendi');
        }).catch((error)=>{console.log(error)})

        
        // Fill User Information from api 
    }

    handleFacultyNameChange(event) {
        var FacultyName = event.target.value;
        this.setState({FacultyName});
    }
    handleFacultyAddressChange(event) {
        var FacultyAddress = event.target.value;
        this.setState({FacultyAddress});
    }
    handleUniversityIdChange(event) {
        var UniversityId = event.target.value;
        this.setState({FkUniversityId:UniversityId});
        
    }

    componentDidMount() {

            axios.get('http://unieventorapi.azurewebsites.net/api/UniversityApi').then((response)=>{
                this.setState({universities:response.data});
            }).catch((error)=>{
                console.log(error);
            });


    }


    render() {
        var resizenone={
           resize : 'none'           
       }
       return (
           <div>
                <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

             <h2>Fakülte Tanımlama</h2>
             <div className="w3-row w3-section">
                <div className="w3-half w3-container">
                    <select className="w3-select w3-border w3-padding" name="option" onChange={this.handleUniversityIdChange.bind(this)} >
                        <option value="" disabled selected>Üniversite Seç</option>
                        {this.state.universities.map((item)=>{
                            return <option key={item.UniversityId} value={item.UniversityId}>{item.UniversityName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="w3-row w3-section">
                <div className="w3-container w3-half">
                    <input className="w3-input w3-border w3-padding" type="text" onChange={this.handleFacultyNameChange.bind(this)}  placeholder="Fakülte Adı" id="txtUniName"/>
                </div>
            </div>
            <div className="w3-row w3-section">
                <div className="w3-container w3-half">
                        <textarea className="w3-input w3-border w3-padding " style={resizenone} onChange={this.handleFacultyAddressChange.bind(this)} placeholder="Fakülte Adres"></textarea>
                </div>
            </div>
            <div className="w3-row ">
                <div className="w3-half">
                    <div className="w3-container w3-right">
                        <button className="w3-btn w3-ripple w3-green">Fakülteyi Ekle</button>
                    </div>
                </div>
            </div>
            </form>
           </div>
       );
    }
}

export default CreateFaculty;

