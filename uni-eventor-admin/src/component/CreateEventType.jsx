import React, { Component } from 'react';
import '../css/w3.css';
import axios from 'axios';

class CreateEventType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Types : [],
            EventTypeName : ''
        };

         axios.get('http://unieventorapi.azurewebsites.net/api/EventTypeApi').then((response)=>{
                this.setState({Types:response.data});
            }).catch((error)=>{
                console.log(error);
            });
    }

    handleEventTypeNameChange(event) {
        var EventTypeName = event.target.value;
        this.setState(prevState => ({
            EventTypeName: EventTypeName 
        }));
        
     }
    submitHandler(e) {
        e.preventDefault();
       
         var newEventType ={
            EventTypeName : this.state.EventTypeName
        }

        axios.post('http://unieventorapi.azurewebsites.net/api/EventTypeApi',newEventType).then((response)=>{
           console.log(response);
            alert('Etkinlik Tipi Eklendi');
        }).catch((error)=>{console.log(error)})
}

    render() {
       
       return (
           <div>
                <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

               <h2>Etkinlik Tipi</h2>
                    <div className="w3-row w3-section">
                        <div className="w3-container w3-half">
                            <input className="w3-input w3-border w3-padding" type="text"  onChange={this.handleEventTypeNameChange.bind(this)} placeholder="Etkinlik Tipi" id="txtEventTypeName"/>
                        </div>
                    </div>
                    <div className="w3-row ">
                        <div className="w3-half">
                            <div className="w3-container w3-right">
                                <button className="w3-btn w3-ripple w3-green">Etkinlik Tipi Ekle</button>
                            </div>
                        </div>
                    </div>
                    </form>
                     <div className="w3-row w3-section">
                        <div className="w3-container w3-half">
                             <table className="w3-table-all w3-hoverable" id="myTable">
                                <thead>
                                <tr className="w3-light-grey">
                                    <th>Tip ID</th>
                                    <th>Etkinlik Tip Adı</th>
                                </tr>
                                </thead>
                            
                                    {this.state.Types.map((item)=>{
                                        
                                        return <tr>
                                                    <td>{item.EventTypeId}</td>
                                                    <td>{item.TypeName}</td>
                                                
                                                </tr>
                                    })}
                                
                                
                                </table>
                        </div>
                    </div>
           </div>
       );
    }
}

export default CreateEventType;

