import React, {useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SchoolService from '../services/SchoolService';


const AddMatchDataform = () => {
    const options = [];
    SchoolService.getSchools().then((response) => {           
        for(var i = 0; i < response.data.length; i++) 
        {
            if(response.data[i].name !== localStorage.school)
                {options.push({
                    value: response.data[i].name,
                    label: response.data[i].name,
                });
            }
        }
    });
      
    const inputAwayTeam = useRef();
    const inputDivision = useRef();
    
   
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }
        localStorage.awayTeam = "";
        localStorage.matchDate ="";
    }); 
    const [matchDate, setMatchDate] = useState(new Date());
    const [division,setDivision] = useState('')
    const [awayTeam,setAwayTeam] = useState('')
  
    const isValidForm = () => {
        var valid = true;
           /* check division */
            if(division.length < 1){
                inputDivision.current.style.color = "red";
                valid = false;
            }
            else {
                inputDivision.current.style.color = "black";
            }
            /* check awayTeam */
            if(awayTeam < 1){
                inputAwayTeam.current.style.color = "red";
                valid = false;
            }
            else {
                inputAwayTeam.current.style.color = "black";
            }
            console.log(matchDate);
            return valid;
      }
      
    return(
        <div>
            <header>
                <Navbar /> 
            </header>
            <br></br>
            <div className = "container" style={{paddingRight:'0.75rem',paddingLeft:'0.75rem',marginLeft: 'auto',marginRight:'auto'}}>
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <div>
                            <h2 className = "text-center">Add Match Results</h2>
                            <div className = "card-body">
                                <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Home Team:</label>
                                    <input
                                        type = "text"
                                        readOnly={true} 
                                        className = "form-control"
                                        value = {localStorage.school}                                       
                                    >
                                    </input>
                                </div >
                                    <br/>                                    
                                    <div ref={inputAwayTeam}>
                                        <label className = "form-label">Away Team:</label>
                                        <Select
                                            type = "text"                                            
                                            placeholder = "Pick Away Team"
                                            onChange = {(e) =>{ setAwayTeam(e.label) }} 
                                            options={options}
                                            required
                                        /> 
                                    <br/>
                                    </div>
                                    <label className = "form-label">Division:</label>
                                    <div className = "form-group mb-2" ref={inputDivision}>                                      
                                        <input type="radio" value="JH" name="division" onChange = {(e) => setDivision(e.target.value)} /> Junior High 
                                        <br/>
                                        <input type="radio" value="HS" name="division" onChange = {(e) => setDivision(e.target.value)} /> High School
                                        <br/>
                                       
                                    </div>
                                    <br/>
                                    <div>
                                        <label className = "form-label">Match Date:</label> 
                                        <DatePicker selected={matchDate} onChange={(date) => setMatchDate(date)} className = "form-control" style={{width: '20%'}} onKeyDown={(e) => {
    e.preventDefault();
}}/>
                                    </div>
                                    <br></br>
                                    <div>
                                        <button type="button" className = "btn btn-primary mb-2 player-right" onClick={()=>{
                                            if(isValidForm()){
                                                localStorage.matchDivision = division;    
                                                localStorage.awayTeam = awayTeam;   
                                                localStorage.matchDate = matchDate.toLocaleDateString(); 
                                                if(division === "JH Boys" || division === "JH Girls"){
                                                    navigate('/add-match-data-jh')
                                                }
                                                else{
                                                    navigate('/add-match-data-h')
                                                }                                                                            
                                            }
                                        }}>Next</button> 
                                        <button onClick={(e)=>{ navigate('/home');}} className = "btn btn-primary mb-2 player-right"  >Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMatchDataform 