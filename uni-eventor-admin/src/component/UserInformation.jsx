import React, { Component } from 'react';
import '../css/w3.css';
import axios from 'axios';
import * as AuthModule from '../App.Auth';

class UserInformation extends Component {
      constructor(props) {
        super(props);
        this.state = {
            infos :{
                AttendingEvents : [] , 
                Communities : [] , 
                DateJoined : '' , 
                Department : [] , 
                Email : '' , 
                EmailConfirmed : '' ,
                FkDepartment : '' ,
                FkUserPhoto :'' ,
                Id : '' ,
                Interests :[] , 
                Name :'' ,
                Roles :[], 
                Surname : '' ,
                UniResponsibilities: [] ,
                UserName : '' ,
                UserPhoto :[]  
            },
            universities : [],
            faculties: [] , 
            departments:[],
            UserName :'' ,
            Email:'', 
            Name :'', 
            Surname:'' , 
            DepartmentId:'' ,
            FkUserPhoto : '' ,
            ContentPostModel :{
                ContentId :'' ,
                FileName :'' ,
                Base64Data :'' ,
                FkContentTypeId :'' 
            }

            
        };
        AuthModule.login('testuser', 'Cem.123', () => {
            }, (error) => {
                this.setState(prevState => ({
                    username: prevState.username,
                    password: prevState.password,
                    error: 'User doesn\'t exist or username and password does not match'
                }));
            });
            debugger;
         axios.get('http://unieventorapi.azurewebsites.net/api/Account/UserInfo').then((response) => {
             debugger;
            this.setState({ infos: response.data });
        }).catch((error) => {
            console.log(error);
        });
    }
     componentDidMount() {

        axios.get('http://unieventorapi.azurewebsites.net/api/UniversityApi').then((response) => {
            this.setState({ universities: response.data });
        }).catch((error) => {
            console.log(error);
        });
        axios.get('http://unieventorapi.azurewebsites.net/api/FacultyApi').then((response)=>{
                this.setState({faculties:response.data});
        }).catch((error)=>{
                console.log(error);
        });
        axios.get('http://localhost:60556/api/DepartmentApi').then((response)=>{
                this.setState({departments:response.data});
        }).catch((error)=>{
                console.log(error);
        });


    }
    submitHandler(e) {
        e.preventDefault();
    //    console.log(this.state.ContentPostModel);
        // axios.post('http://unieventorapi.azurewebsites.net/api/ContentApi',this.state.ContentPostModel).then((response)=>{
        //     alert('Foto Güncellendi');
        // }).catch((error)=>{console.log(error)})
       
        var UpdatedInformations = {
                UserName : this.state.infos.UserName , 
                Email : this.state.Email , 
                Name : this.state.Name , 
                Surname : this.state.Surname , 
                DepartmentId : 1 , 
                FkUserPhoto : 1

        }

          axios.post('http://unieventorapi.azurewebsites.net/api/Account/UpdateUser',UpdatedInformations).then((response)=>{
            alert('Bilgiler Güncellendi');
        }).catch((error)=>{console.log(error)})
        // Fill User Information from api 
    }

     handleUniversityIdChange(event) {
        var UniversityId = event.target.value;
         axios.get('http://unieventorapi.azurewebsites.net/api/FacultyApi?UniId='+UniversityId).then((response)=>{
                this.setState({faculties:response.data});
            }).catch((error)=>{
                console.log(error);
            });
    }
    handleFacultyIdChange(event) {
        debugger;
        var FacultyId = event.target.value;
         axios.get('http://localhost:60556/api/DepartmentApi?UniId=1&FacId='+FacultyId).then((response)=>{
             debugger;
                this.setState({departments:response.data});
            }).catch((error)=>{
                console.log(error);
            });
    }
    handleNameChange(event) {
        var Name = event.target.value;
        this.setState({Name});
    }
    handleSurnameChange(event) {
        var Surname = event.target.value;
        this.setState({Surname});
    }
    handleEmailChange(event) {
        var Email = event.target.value;
        this.setState({Email});
    }
     _handleImageChange(e) {
        e.preventDefault();
        debugger;
        let reader = new FileReader();
        let file = e.target.files[0];
        
        reader.onloadend = () => {
             var  ContentPostModel ={
                ContentId :'' ,
                FileName :file.name ,
                Base64Data : reader.result ,
                FkContentTypeId : 2 
            }
            this.setState({ContentPostModel});
        }
        // console.log(reader);
        // console.log(file);
        // console.log(file);
        reader.readAsDataURL(file);
    }
    render() {
       var width100  = {
           width:'100%'
       }
       
       return (
           <div>
                <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

              <h2>Kullanici Bilgilerim </h2>

                <div className="w3-threequarter">
                    <div className="w3-row w3-section">
                        <div className="w3-container w3-half">
                            <input className="w3-input w3-border w3-padding" type="text" placeholder={this.state.infos.UserName}  id="txtUniName"></input>
                        </div>
                        <div className="w3-half">
                            <div className="w3-container">
                                <input className="w3-input w3-border w3-padding" type="text" placeholder={this.state.infos.Email}  onChange={this.handleEmailChange.bind(this)}  id="txtUniName"/>
                            </div>
                        </div>
                    </div>
                
                    <div className="w3-row w3-section">
                        <div className="w3-half">
                            <div className="w3-container">
                                <input className="w3-input w3-border w3-padding" type="text" placeholder={this.state.infos.Name}  onChange={this.handleNameChange.bind(this)}   id="txtUniName"/>
                            </div>
                        </div>
                        <div className="w3-half">
                            <div className="w3-container">
                                <input className="w3-input w3-border w3-padding" type="text" placeholder={this.state.infos.Surname} onChange={this.handleSurnameChange.bind(this)}  id="txtUniName"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w3-row w3-section">
                        <div className="w3-half">
                            <div className="w3-container">
                                <select className="w3-select w3-border w3-padding" name="option"  onChange={this.handleUniversityIdChange.bind(this)}>
                                <option value="" disabled defaultValue>Üniversite Seç</option>
                                {this.state.universities.map((item=>{
                                    return <option key={item.UniversityId} value={item.UniversityId}>{item.UniversityName}</option>
                                }))}
                               
                            </select>
                            </div>
                        </div>
                        <div className="w3-half">
                            <div className="w3-container">
                                <select className="w3-select w3-border w3-padding" name="option" onChange={this.handleFacultyIdChange.bind(this)} >
                                 <option value="" defaultValue>Fakülte Seç</option>
                                {this.state.faculties.map((item)=>{
                                    return <option key={item.FacultyId} value={item.FacultyId}>{item.FkUniversityId} - {item.FacultyName}</option>
                                })}
                            </select>
                            </div>
                        </div>
                        <div className="w3-half">
                            <div className="w3-container">
                                <select className="w3-select w3-border w3-padding" name="option" >
                                 <option value="" disabled defaultValue>Bölüm Seç</option>
                                {this.state.departments.map((item)=>{
                                    return <option key={item.DepartmentId} value={item.DepartmentId}> {item.DepartmentName}</option>
                                })}
                            </select>
                            </div>
                        </div>
                    </div>
                
                    <div className="w3-row ">
                        <div className="w3-threequarter">
                            <div className="w3-container w3-right">
                                <button className="w3-btn w3-ripple w3-green">Guncelle</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w3-quarter">
                    <div className="w3-card-2" style={width100}>
                        <img src={this.state.infos.UserPhoto.ContentUrl} className="w3-hover-opacity " alt="Person" style={width100}/>
                        <div className="w3-container">
                        <h4><b>Profil Resmi</b></h4>
                         <div className="w3-row w3-section">
                            <div className="w3-container">
                                <input type="file" id="file" onChange={(e)=>this._handleImageChange(e)}/>

                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <br></br>
                </form>
           </div>
       );
    }
}

export default UserInformation;

