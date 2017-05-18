import React, { Component } from 'react';
import '../css/w3.css';
import axios from 'axios';

class CreateEventInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Interests:[],
            InterestName : ''
        };
           axios.get('http://unieventorapi.azurewebsites.net/api/EventInterestApi').then((response)=>{
                this.setState({Interests:response.data});
            }).catch((error)=>{
                console.log(error);
            });

    }

    submitHandler(e) {
        e.preventDefault();
        console.log(this.state);

       var newEventInterest  = {
            InterestName : this.state.InterestName 
       }
        axios.post('http://unieventorapi.azurewebsites.net/api/EventInterestApi',newEventInterest).then((response)=>{
           console.log(response);
            alert('Etkinlik Alanı Eklendi');
        }).catch((error)=>{console.log(error)})

       
    }

    handleInterestNameChange(event) {
        var InterestName = event.target.value;
        this.setState({InterestName: InterestName  });
        // alert(InterestName);
     }

     

    render() {
       
       return (
           <div>
                <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

               <h2>Etkinlik Alanı Tanımlama</h2>
                   <div className="w3-row w3-section">
                        <div className="w3-container w3-half">
                            <input className="w3-input w3-border w3-padding" type="text" placeholder="Etkinlik Alanı Adı"  onChange={this.handleInterestNameChange.bind(this)} id="txtEventInterestName"/>
                        </div>
                    </div>
                    
                    <div className="w3-row ">
                        <div className="w3-half">
                            <div className="w3-container w3-right">
                                <button className="w3-btn w3-ripple w3-green">Etkinlik Alanı Ekle</button>
                            </div>
                        </div>
                    </div>
                     </form>
                       <div className="w3-row ">
                        <div className="w3-half">
                        <table className="w3-table-all w3-hoverable" id="myTable">
                        <thead>
                        <tr className="w3-light-grey">
                            <th>İlgi ID</th>
                            <th>Etkinlik İlgi Alan Adı</th>
                        </tr>
                        </thead>
                    
                            {this.state.Interests.map((item)=>{
                                
                                return <tr>
                                            <td>{item.InterestId}</td>
                                            <td>{item.InterestName}</td>
                                        
                                        </tr>
                            })}
                        
                        
                        </table>
                        </div>
                        </div>
                      
           </div>
       );
    }
}

export default CreateEventInterest;

