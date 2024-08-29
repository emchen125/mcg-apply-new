import React from "react";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router";
import { BrowserRouter as Router, Route} from 'react-router-dom';


export default function DeliberationsForm() {
    const [accept, setAccept] = useState([]);
    const [revisit, setRevisit] = useState([]);
    const [reject, setReject] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log(isLoading);

    useEffect(() => {
        fetch("/api/admin/view-all-accepted").then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setAccept(data.candidates);
                    console.log(data.candidates)
                    setIsLoading(false);
                });
            } else {
                navigate("/login");
            }
        });
    }, []);

    const navigate = useNavigate();

    return (
        (isLoading) ? <div>Loading Applicants...</div> :(
        <div>
            <div className="grid gap-2 grid-cols-3" >
                <div className="col-start-1 bg-gray-400">
                    {accept.map((value) => (
                        <div>
                            {value.firstname} {value.lastname}
                        </div>
                    ))}
                </div>
                <div className="col-start-2 bg-gray-400">
                    {revisit.map((value) => (
                        <div>
                            {value.firstname} {value.lastname}
                        </div>
                    ))}
                </div>
                <div className="col-start-3 bg-gray-400">
                    {reject.map((value) => (
                        <div>
                            {value.firstname} {value.lastname}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ));
}
