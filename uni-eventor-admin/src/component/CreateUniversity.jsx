import React, { Component } from 'react';
import '../css/w3.css';
import axios from 'axios';

class CreateUniversity extends Component {
     constructor(props) {
        super(props);
        this.state = {
            universities:[],
            UniversityId: '',
            UniversityName: '',
            Address: '',
            Website:''
        };
         axios.get('http://unieventorapi.azurewebsites.net/api/UniversityApi').then((response)=>{
                this.setState({universities:response.data});
            }).catch((error)=>{
                console.log(error);
            });
    }

    submitHandler(e) {
        e.preventDefault();
        
        console.log(this.state);
       
        axios.post('http://unieventorapi.azurewebsites.net/api/UniversityApi',this.state).then((response)=>{
            alert('Universite Eklendi');
        }).catch((error)=>{console.log(error)})

    }

    handleIdChange(event) {
        var UniversityId = event.target.value;
        this.setState({UniversityId});
    }

    handleWebSiteChange(event) {
        var Website = event.target.value;
        console.log(Website);
        this.setState({Website});
    }

    handleNameChange(event) {
        var UniversityName = event.target.value;
        this.setState({UniversityName: UniversityName});
        // bi üst satır ile aynı şeyi ifade eder
        //this.setState({UniversityName});
        
    }

     handleAddressChange(event) {
        var UniversityAddress = event.target.value;
        this.setState({Address:UniversityAddress});
       
    }
    render() {
       var resizenone={
           resize : 'none'
       }
       return (
           <div>
            <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

               <h2>Üniversite Tanımlama</h2>
                <div className="w3-row w3-section">
                    <div className="w3-threequarter">
                        <div className="w3-container w3-quarter">
                            <input className="w3-input w3-border w3-padding" type="text" onChange={this.handleIdChange.bind(this)}  placeholder="Üniversite Kodu" id="txtUniName"/>
                        </div>
                        <div className="w3-container w3-threequarter">
                            <input className="w3-input w3-border w3-padding" type="text" onChange={this.handleWebSiteChange.bind(this)} placeholder="Web Sitesi" id="txtUniName"/>
                        </div>
                    </div>
                     <div className="w3-quarter"></div>	
                
                </div>
                
                <div className="w3-row w3-section">
                    <div className="w3-threequarter">
                        <div className="w3-container">
                            <input className="w3-input w3-border w3-padding" type="text" onChange={this.handleNameChange.bind(this)}  placeholder="Üniversite Adı" id="txtUniName"/>
                        </div>
                    </div>
                </div>
                <div className="w3-row w3-section">
                    <div className="w3-threequarter">
                        <div className="w3-container">
                            <textarea className="w3-input w3-border w3-padding" onChange={this.handleAddressChange.bind(this)} style={resizenone} placeholder="Üniversite Adres"></textarea>
                        </div>
                    </div>
                </div>
                <div className="w3-row ">
                    <div className="w3-threequarter">
                        <div className="w3-container w3-right">
                            <button className="w3-btn w3-ripple w3-green">Üniversiteyi Ekle</button>
                        </div>
                    </div>
                </div>
                </form>
                    <br></br>
                <input className="w3-input w3-border w3-padding" type="text" placeholder="Üniversite Ara.." id="myInput" onkeyup="myFunction()"/>
                <table className="w3-table-all w3-hoverable" id="myTable">
                    <thead>
                    <tr className="w3-light-grey">
                        <th>Üniversite Kodu</th>
                        <th>Üniversite Adı</th>
                        <th>Web Sitesi</th>
                        <th>Adres</th>
                        <th>Düzenle</th>
                    </tr>
                    </thead>
                   
                        {this.state.universities.map((item)=>{
                             
                            return <tr>
                                        <td>{item.UniversityId}</td>
                                        <td>{item.UniversityName}</td>
                                        <td>{item.Website}</td>
                                        <td>{item.Address}</td>
                                        <td>Düzenle</td>
                                    </tr>
                        })}
                    
                    
             </table>
           </div>
       );
    }
}

export default CreateUniversity;

