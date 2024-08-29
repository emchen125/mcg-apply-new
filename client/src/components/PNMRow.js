import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function PNMProfile({ pnm, index }) {

    const navigate = useNavigate();

    const [events, setEvents] = useState({});
    const [classYear, setClassYear] = useState("-");
    const [resume, setResume] = useState(false);
    const [profileImg, setProfileImg] = useState(false);
    const [profile, setProfile] = useState(false);
    const [isProfileOpen,setProfileOpen] = useState(false);

    const openResume = () => {
        window.open(`api/admin/candidate-resume/${pnm.email}`, "_blank");
    }
    const openProfileImg = () => {
        window.open(`api/admin/candidate-profile-img/${pnm.email}`, "_blank");
    }
    const openProfile = () => {w
        // console.log("hello");
        fetch(`api/admin/candidate-info/${pnm.userid}`).then((response) => {
                if (response.ok) {
                    response.json().then((data)=>{
                        console.log(data.candidate);
                    })
                }
            })
        setProfileOpen(true);
    };
    const closeProfile = () => {setProfileOpen(false)};
 
    useEffect(() => {
        if (pnm.userData) {
            if (pnm.userData.events) {
                setEvents(pnm.userData.events);
            } 
        } if (pnm.userData) {
            if (pnm.userData.application) {
                setClassYear(pnm.userData.application.classYear);
                setResume(true)
                if (pnm.userData.application.profileImg) {
                    setProfileImg(true);
                    setProfile(true);
                }
            }
        } 
    })

    return (
        <div className='p-2 grid grid-cols-12 gap-x-2 hover:shadowgrey border border-gray-200 rounded-lg'>
            <div className='col-span-2'>{pnm.firstname} {pnm.lastname}

                {/* <Link to={`/${pnm.userid}`}>{pnm.firstname} {pnm.lastname}</Link> */}
                {/* <button className="text-blue-600 hover:underline" onClick={profile ? openProfile: ""}>{pnm.firstname} {pnm.lastname}</button> */}
            </div>
            <div className='col-span-2'>
                {pnm.email}
            </div>
            <div className='col-span-1'>
                {classYear}
            </div>
            <div className='col-span-1'>{!events.meettheteam ? "-" :((events.meettheteam==="excused")? "Exc": "Yes")}</div>
            <div className='col-span-1'>{!events.pdpanel ? "-" :((events.pdpanel==="excused")? "Exc": "Yes")}</div>
            <div className='col-span-1'>{!events.deipanel ? "-" :((events.deipanel==="excused")? "Exc": "Yes")}</div>
            <div className='col-span-1'>{!events.resumereview ? "-" :((events.resumereview==="excused")? "Exc": "Yes")}</div>
            <div className='col-span-1'>{!events.cheesecakesocial ? "-" :((events.cheesecakesocial==="excused")? "Exc": "Yes")}</div>
            <div className='col-span-1'>{!events.caseworkshop ? "-" :((events.caseworkshop==="excused")? "Exc": "Yes")}</div>
            <div className='col-span-1'>{pnm.userData.feedback.length}</div>
        </div>
    )
}