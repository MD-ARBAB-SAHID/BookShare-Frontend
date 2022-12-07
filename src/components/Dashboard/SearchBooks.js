import React,{useState} from 'react'
import './SearchBooks.css';
import { Button } from '@material-ui/core';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { collegename ,subjectname,semester} from './dummydata';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
const SearchBooks = () => {

    const [collegestate,setcollegestate]= useState("College");
    const [subjectstate,setsubjectstate]= useState("Subject");
    const [semstate,setsemstate]= useState("semester");

    return (
        <div id="searchbookid" className="SearchBooks">
            <div className='outer'>
                <div className='upper'>
                    <div className='first_part'>
                    <div className="container-b">
                    <div className='first_part_nav' >
                        <Button color="primary" className='header_button btn btn-2'>Home Page</Button>
                    </div>
                    </div>
                    </div>

                    <div className="heading">
                    
                        <strong className="rainbow-text">BookShare</strong>
                    </div>
                
                    <div className='first_part'>
                    <div className="container-b">
                    <div className='first_part_nav'>
                        <Button color="primary" className='header_button btn btn-2'>Profile</Button>
                    </div>
                    </div>
                    </div>

                </div>
                    
                <div className='filter_portion'>
                    <div className="heading_2 ">
                        <p>  Search Books Here  </p>
                    </div>

                    <div className="filters">
                    <br/>
                        <br/>
                        <div className="dropdowns">
                        <div className="rainbow-text">
                        1.Select Your College Here
                        </div> 
                        
                        <select className="selectoptions" value={collegestate} onChange={(e)=>{
                            setcollegestate(e.target.value);
                        }}  >
                        {collegename.map((college)=>{
                            return(
                                <option value={college.value}>{college.cname}</option>
                            );
                        })}
                        </select>
                        </div>
                        <br/>
                            <br/>

                        <div className="dropdowns">
                        <div className="rainbow-text">
                        2.Select Your Subject Here
                        </div>
                        
                        <select className="selectoptions" value={subjectstate} onChange={(e)=>{
                            setsubjectstate(e.target.value);
                        }}  >

                        {subjectname.map((subject)=>{
                            return(
                                <option value={subject.value}>{subject.sname}</option>
                            );
                        })}
                        </select>
                        </div>
                            <br/>
                            <br/>

                        <div className="dropdowns">
                        <div className="rainbow-text">
                        3.Select Your Semester Here
                        </div>
                        
                        <select className="selectoptions" value={semstate} onChange={(e)=>{
                            setsemstate(e.target.value);
                        }}  >

                        {semester.map((semes)=>{
                            return(
                                <option value={semes.value}>{semes.sem}</option>
                            );
                        })}
                        </select>
                        </div>
                        <br/>
                            <br/>

                    </div>


                </div>

                <div className='search_action'>
                    <Fab variant="extended">
                        <NavigationIcon sx={{ mr: 1 }} />
                        FILTER
                    </Fab>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default SearchBooks
