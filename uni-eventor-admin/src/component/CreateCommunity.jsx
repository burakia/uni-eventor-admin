import React, { Component } from 'react';
import '../css/w3.css';
import axios from 'axios';

class CreateCommunity extends Component {
      constructor(props) {
        super(props);
        this.state = {
            CommunityId: '',
            CommunityName: '',
            DateCreated: '',
            LastUpdated:'' , 
            FkCreatorId : '', 
            FkResponsibleId : ''
        };
        
    }
    submitHandler(e) {
      e.preventDefault();   
       
     
      
      console.log(this.state);
        axios.post('http://unieventorapi.azurewebsites.net/api/CommunityApi',this.state).then((response)=>{
           console.log(response);
            alert('Topluluk Eklendi');
        }).catch((error)=>{console.log(error)})

       
    }
    handleCommunityNameChange(event) {
        var CommunityName = event.target.value;
         var currTime = new Date().toLocaleString();
        console.log(CommunityName);
         this.setState(prevState => ({
            CommunityId: '',
            CommunityName: CommunityName,
            DateCreated: currTime,
            LastUpdated:currTime , 
            FkCreatorId : 'testuser', 
            FkResponsibleId : 'testuser'
        }));
        
    }
    
    handleCommunityResponsibleChange(event) {
        var ResPerson = event.target.value;
         var currTime = new Date().toLocaleString();
        console.log(ResPerson);
         this.setState(prevState => ({
            CommunityId: '',
            CommunityName: prevState.CommunityName,
            DateCreated: currTime,
            LastUpdated:currTime , 
            FkCreatorId : 'testuser', 
            FkResponsibleId : ResPerson
        }));
        
    }


    render() {
        
        return (
            <div>
            <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

                <h2>Topluluk Tanimlama</h2>
                <div className="w3-row w3-section">
                    <div className="w3-threequarter">
                        <div className="w3-container w3-half">
                            <input className="w3-input w3-border w3-padding" onChange={this.handleCommunityNameChange.bind(this)} type="text"placeholder="Topluluk Adi"  id="txtCommunityName" />
                        </div>
                        <div className="w3-container w3-half">
                            <input className="w3-input w3-border w3-padding" onChange={this.handleCommunityResponsibleChange.bind(this)} type="text"  placeholder="Topluluk Baskani Kullanici Adi"  id="txtUniName" />
                        </div>
                    </div>
                    <div className="w3-quarter"></div>

                </div>

                <div className="w3-row ">
                    <div className="w3-threequarter">
                        <div classNames="w3-container w3-right">
                            <button className="w3-btn w3-ripple w3-green">Topluluk Ekle</button>
                        </div>
                    </div>
                </div>

                <br></br>
            </form>
            </div>

        );
    }
}

export default CreateCommunity;
