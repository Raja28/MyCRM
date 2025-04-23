import { useDispatch, useSelector } from "react-redux"
import { PiUserCircleLight } from "react-icons/pi";
import profileImage from "../assets/pp.jpg"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { addAgent, getAllAgents } from "../features/lead";

export default function Agents() {
    const { agents, status, error } = useSelector(state => state.lead)


    const [agentDetail, setAgentDetail] = useState({
        name: "", email: ""
    })

    const closeModalRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionStorage.getItem('agents') === null) {
            dispatch(getAllAgents())
        }
    }, [])

    useEffect(() => {
        if (status === 'success') {
            closeModalRef.current.click()
        }
        setAgentDetail({
            name: "",
            email: ""
        })
    }, [status])

    function onChangeHandler(e) {
        const { name, value } = e.target

        setAgentDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function addNewAgentHandler() {


        if (!agentDetail.email || !agentDetail.name) {
            toast.error("Name, Email required")
            return
        }

        dispatch(addAgent(agentDetail))

    }

    return (
        <>
            <section className="">
                {/* top bar */}
                <div className=" px-2 py-2" style={{ height: "3.5rem", }}>

                    <div className="d-flex justify-content-center my-2 ">
                        <div className="w-100 d-flex justify-content-end">
                            <h3>Sales Agents</h3>

                        </div>
                        <div className="w-100">
                            <button className="btn btn-sm btn-primary float-end"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                            >
                                Add Agent
                            </button>
                        </div>
                    </div>

                    <hr className="m-1" style={{ opacity: "15%" }} />
                </div>
                {
                    error && status === 'error' && (
                        <div className="">
                            <div className=" my-5 d-flex align-items-center flex-column">
                                <p>{error}</p>
                                <p
                                    onClick={() => window.location.reload()}
                                    className="btn btn-sm btn-primary ">
                                    Reload

                                </p>
                            </div>
                        </div>

                    )
                }
                <div>
                    {status == "loading" ? (
                        <div className=" d-flex justify-content-center ">
                            <span className="loader my-5"  ></span>
                        </div>
                    ) :
                        (agents?.length === 0 && status === "success" ? (
                            <div className="my-5 d-flex justify-content-center">
                                <p className="">No Agents Available, Add New</p>
                            </div>
                        ) :

                            <div className="card-group  mx-1">
                                <div className="row gap-3 mx-2 mt-2 ">
                                    {
                                        agents?.map(agent => (
                                            <div key={agent.email} className="card my-1  col-md-6 col-lg-3 " style={{ maxWidth: "13rem" }}>
                                                <img
                                                    src={profileImage}
                                                    className="card-img-top bg-primary"
                                                    alt="user profile image"
                                                // style={{maxWidth: "8rem"}}
                                                />
                                                <div className="card-body fs-6 px-1">
                                                    <p className="card-text p-0 m-0 d-flex flex-column">
                                                        <small className="fw-semibold">Name:</small>
                                                        <small>{agent?.name}</small>
                                                    </p>
                                                    <p className="card-text p-0 m-0 d-flex flex-column">
                                                        <small className="fw-semibold">Email:</small>
                                                        <small>{agent?.email}</small>
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>)
                    }
                </div>
            </section>


            {/* add agent modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Agent</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="John Doe"
                                    value={agentDetail.name}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="name@example.com"
                                    value={agentDetail.email}
                                    onChange={onChangeHandler}

                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeModalRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={addNewAgentHandler}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}