import React, { Component } from 'react';
import '../css/w3.css';
import CreateUniversity from '../component/CreateUniversity.jsx'
import CreateFaculty from '../component/CreateFaculty.jsx'
import CreateDepartment from '../component/CreateDepartment.jsx'

class University extends Component {

    constructor(){
        super();
        this.handleClick = this.handleClick.bind();
    }
   
     handleClick = (e, cityName) => {
        // e burada click icin bildigimiz event nesnesi
        var i, x, tablinks;
        x = document.getElementsByClassName("city");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
        }
        document.getElementById(e).style.display = "block";
        e.currentTarget.firstElementChild.className += " w3-border-red";

    }
     
    render() {
      var displaynone={
          display : 'none'
      }
        return (
           <div>
            <div className="w3-row">
                    <span onClick={(e) => this.handleClick('Universite')}>
                        <div className="w3-third tablink w3-border-red w3-bottombar w3-hover-light-grey w3-padding">Üniversite</div>
                    </span>
                      <span onClick={(e) => this.handleClick('Fakulte')}>
                        <div className="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">Fakülte</div>
                    </span>
                      <span onClick={(e) => this.handleClick('Bolum')}>
                        <div className="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">Bölüm</div>
                    </span>
                    
                </div>
              <div id="Universite" className="w3-container city" >
                    <CreateUniversity />
              </div>
              <div id="Fakulte" className="w3-container city" style={displaynone}>
                  <CreateFaculty />
              </div>
               <div id="Bolum" className="w3-container city" style={displaynone}>
                   <CreateDepartment/>
               </div>

           </div>
        );
    }
}

export default University;