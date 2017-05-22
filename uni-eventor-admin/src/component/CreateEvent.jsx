
import React, { Component } from 'react';
import '../css/w3.css';
import Map from '../component/Map.jsx';
import axios from 'axios';
class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EventTypes: [],
            EventInterests: [],
            EventName: '',
            EventStartDate: '',
            EventEndDate: '',
            MaxSeats: '',
            Latitude: 40,
            Longitude: 30,
            Address: '',
            Content: '',
            CommunityId: '1',
            InterestId: '',
           // FileName: '',
           // Base64Data: '',
            FkEventTypeId: 1,
            imagePreviewUrl: '',
            file: ''
        };
    }

    handleEventNameChange(event) {
        var EventName = event.target.value;
        this.setState({ EventName });
    }

    handleEventStartDateChange(event) {
        var EventStartDate = event.target.value;
        this.setState({ EventStartDate });
    }

    handleEventEndDateChange(event) {
        var EventEndDate = event.target.value;
        this.setState({ EventEndDate });
    }
    handleMaxSeatsChange(event) {
        var MaxSeats = event.target.value;
        this.setState({ MaxSeats });
    }
    handleFkEventTypeIdChange(event) {
        var FkEventTypeId = event.target.value;
        this.setState({ FkEventTypeId });

    }
    handleInterestIdsChange(event) {
        var InterestId = event.target.value;
        this.setState({ InterestId });
        console.log(InterestId);
    }
    handleContentChange(event) {
        var Content = event.target.value;
        this.setState({ Content });
    }
    handleAddressChange(event) {
        var Address = event.target.value;
        this.setState({ Address });
    }
    handleLocationNameChange(event) {
        var LocationName = event.target.value;
        this.setState({ LocationName });
    }

    _handleImageChange(e) {
        e.preventDefault();


        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            console.log(reader);
            console.log(file);
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }
    submitHandler(e) {
        e.preventDefault();
    
        var newEvent = {
            EventName: this.state.EventName,
            EventStartDate: this.state.EventStartDate,
            EventEndDate: this.state.EventEndDate,
            MaxSeats: this.state.MaxSeats,
            LocationName: this.state.LocationName,
            Latitude: "40", // this.state.Latitude,
            Longitude:  "30",//this.state.Longitude,
            Address: this.state.Address,
            Content: this.state.Content,
            CommunityId: [this.state.CommunityId],
            InterestIds: [this.state.InterestId],
            FileName:this.state.file.name,
            Base64Data:'VmlraXBlZGk=',
            FkEventTypeId: 1, //this.state.FkEventTypeId,
            FkPosterId:1
        }

        console.log(newEvent);
        axios.post('http://unieventorapi.azurewebsites.net/api/EventApi', newEvent).then((response) => {
            console.log(response);
            alert('Etkinlik Eklendi');
        }).catch((error) => { console.log(error) })

        alert('Etkinlik Oluşturuldu');
    }



    componentDidMount() {

        axios.get('http://unieventorapi.azurewebsites.net/api/EventInterestApi').then((response) => {
            this.setState({ EventInterests: response.data });
        }).catch((error) => {
            console.log(error);
        });

        axios.get('http://unieventorapi.azurewebsites.net/api/EventTypeApi').then((response) => {
            this.setState({ EventTypes: response.data });
        }).catch((error) => {
            console.log(error);
        });

    }
 
    render() {

        var resizenone = {
            resize: 'none'
        };
        var width100 = {
            width: '100%'
        };
        var poster = {
            width: '240px',
            height: '340px'
        }
        var mapstyle={
            width:'1100',
            height:'300'
        }
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="w3-hover-opacity" alt="Person" style={poster} src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="" >Lütfen etkinlik için Poster seçiniz</div>);
        }
        return (
            <div>
                
                <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

                    <h2>Etkinlik Tanımlama</h2>
                    <div className="w3-threequarter">
                        <div className="w3-row w3-section">

                            <div className="w3-container">
                                <input className="w3-input w3-border w3-padding" type="text" placeholder="Etkinlik Adı" onChange={this.handleEventNameChange.bind(this)} id="txtEventName" />
                            </div>

                        </div>
                        <div className="w3-row w3-section">

                            <div className="w3-container w3-half">

                                <label><i className="fa fa-calendar-o"></i> Etkinlik Başlangıç</label>
                                <input className="w3-input w3-border" type="date" placeholder="DD MM YYYY" onChange={this.handleEventStartDateChange.bind(this)} name="CheckIn" required="" />

                            </div>
                            <div className="w3-container w3-half">

                                <label><i className="fa fa-calendar-o"></i> Etkinlik Bitiş</label>
                                <input className="w3-input w3-border" type="date" placeholder="DD MM YYYY" onChange={this.handleEventEndDateChange.bind(this)} name="CheckIn" required="" />

                            </div>



                        </div>

                        <div className="w3-row w3-section">

                            <div className="w3-container w3-half">
                                <label><i className="fa fa-child"></i>Kişi</label>
                                <input className="w3-input w3-border" type="number" min="1" max="5000" onChange={this.handleMaxSeatsChange.bind(this)} name="Kids" />

                            </div>
                            <div className="w3-container w3-half">
                                <label><i className="fa fa-star"></i>Etkinlik Tipi</label>
                                <select className="w3-select w3-border w3-padding" name="option" onChange={this.handleFkEventTypeIdChange.bind(this)} >
                                    <option value="" disabled selected>Etkinlik Tipi Seç</option>
                                    {this.state.EventTypes.map((item) => {
                                        return <option key={item.FkEventTypeId} value={item.FkEventTypeId}>{item.TypeName}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                        <div className="w3-row w3-section">
                            <div className="w3-container ">
                                <select className="w3-select w3-border w3-padding" name="option" onChange={this.handleInterestIdsChange.bind(this)} multiple>
                                    <option value="" disabled selected>Etkinlik İlgi Alanı Seç</option>
                                    {this.state.EventInterests.map((item) => {
                                        return <option key={item.InterestId} value={item.InterestId}>{item.InterestName}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                        <div className="w3-row w3-section">

                            <div className="w3-container">
                                <textarea className="w3-input w3-border w3-padding" style={resizenone} onChange={this.handleContentChange.bind(this)} placeholder="Etkinlik İçeriği" rows="5"></textarea>
                            </div>

                        </div>
                        <div className="w3-row w3-section">
                            <div className="w3-container">
                                <input className="w3-input w3-border w3-padding" type="text" maxLength="50" placeholder="LocationName" onChange={this.handleLocationNameChange.bind(this)} id="txtLocationName" />
                            </div>
                        </div>
                        <div className="w3-row w3-section">
                            <div className="w3-container">
                                <input className="w3-input w3-border w3-padding" type="text" maxLength="500" placeholder="Address" onChange={this.handleAddressChange.bind(this)} id="txtEventAddress" />
                            </div>
                        </div>
                        <div className="w3-row w3-section">
                            <div className="w3-container">
                                <input type="file" id="file" onChange={(e) => this._handleImageChange(e)} />

                            </div>
                        </div>
                        <div className="w3-row ">

                            <div className="w3-container w3-right">
                                <button className="w3-btn w3-ripple w3-green">Etkinliği Ekle</button>
                            </div>

                        </div>
                    </div>
                    <div className="w3-quarter">
                        <div className="w3-card-4 test " style={width100}>
                            {$imagePreview}
                            <div className="w3-container">
                                <h4><b>Etkinlik Resmi</b></h4>

                            </div>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div id="map" style={mapstyle}>

                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default CreateEvent;
