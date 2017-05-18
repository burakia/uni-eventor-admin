
import React, { Component } from 'react';
import '../css/w3.css';




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
    }
    handleCommunityNameChange(event) {
        var CommunityName = event.target.value;
        console.log(CommunityName);
        this.setState({CommunityName});
    }



    render() {
        
        return (
            <div>
            <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

                <h2>Topluluk Tanimlama</h2>
                <div className="w3-row w3-section">
                    <div className="w3-threequarter">
                        <div className="w3-container w3-half">
                            <input className="w3-input w3-border w3-padding" type="text"placeholder="Topluluk Adi"  id="txtCommunityName" />
                        </div>
                        <div className="w3-container w3-half">
                            <input className="w3-input w3-border w3-padding" type="text"  placeholder="Topluluk Baskani Kullanici Adi"  id="txtUniName" />
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
