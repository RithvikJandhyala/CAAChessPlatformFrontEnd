import axios from 'axios'
import {useState} from 'react'
const SERVER_URL = 'http://localhost:8080';
const SCHOOLS_REST_API_URL = SERVER_URL + '/findAllSchools';
const SCHOOLS_CREATE_REST_API_URL = SERVER_URL + '/addSchool';
const SCHOOL_DELETE = SERVER_URL + '/deleteSchool';
const SCHOOLS_ADD = SERVER_URL + '/schools/add';
const SCHOOL_FIND = SERVER_URL + '/schools';
/*const school_details = [
    { name: "BASIS Scottsdale", image: "BScottsdale.png" },
    { name: 'BASIS Mesa', image: "BMesa.png" },
    { name: 'BASIS Ahwatukee', image: "BAhwatukee.png" },
    { name: 'Heritage Academy Maricopa', image: "HAM.png" },
    { name: 'Heritage Academy Mesa', image: "HMesa.png" },
    { name: 'Benjamin Franklin Charter', image: "BFC.png" },
    { name: 'ALA Gilbert North', image: "ALAGN.png" },
    { name: 'BASIS Prescott', image: "BPrescott.png" },
    { name: 'Tri-City Christian', image: "TCC.png" },
]
*/



class SchoolService {

    getSchoolImg(schoolName){        
        //return  school_details.find(myschool => myschool.name === school).image;
       this.getSchool(8000).then((response) => {           
        return response.data.image
       });        
       return null
    }
    getSchools(){
        return axios.get(SCHOOLS_REST_API_URL)
    }
    deleteSchool(id){
        return axios.get(SCHOOL_DELETE + "/"+id)
    }
   
    addSchool(formData){
        return axios.post(SCHOOLS_ADD,formData)
    }
   
    getSchool(id){
        return axios.get(SCHOOL_FIND + "/"+id )
    }    
}
export default new SchoolService()