import { Link, useParams, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Lead from "../components/Lead";
import Sales from "../components/Sales"
import Status from "../components/Status"
import Agents from "../components/Agents"
import Reports from "../components/Reports"
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { useDispatch, useSelector } from "react-redux";

import { addLead, addTag, fetchAllDetails } from "../features/lead";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import LeadOverview from "../components/LeadOverview";

const mdScrn = "990"
const leadStatus = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"]
const leadSourceList = ["Website", "Referral", "Cold Call", "Advertisment", "Email", "Other"]
const priorityList = ["High", "Medium", "Low"]
// const tagList = ["High Value", "Follow Up"]
const statusSuccess = "success"

export default function Home() {
    const animatedComponents = makeAnimated()
    const { width, height } = useWindowDimensions()
    const [components, setComponents] = useState({
        // "Home": <Leadoverview />,
        "lead": <Lead />,
        "sales": <Sales />,
        "status": <Status />,
        "agents": <Agents />,
        "reports": <Reports />,
    })
    const { status, error, leads, agents, tags } = useSelector(state => state.lead)
    const { component: componentParams } = useParams()
    const closeTagModalBtnRef = useRef()
    const addLeadBtnRef = useRef()
    const addLeadCloseBtnRef = useRef()
    const addLeadOpenBtnRef = useRef()
    const [options, setOptions] = useState([])

    const dispatch = useDispatch()
    const [newTag, setNewTag] = useState()
    const actionRef = useRef(undefined)
    const [searchParams, setSearchParams] = useSearchParams();
    const { loading: fetchLoading, error: fetchErr, data, fetchData } = useFetch()
    // console.log(leads);

    const [formData, setFormData] = useState({
        name: "", agent: "", source: "", status: "", priority: "",
        timeToClose: "", tags: []
    })

    // useEffect(() => {
      
    //     if (searchParams.size > 0) {
    //         const status = { status: searchParams.get('status') }
    //         fetchData(status)
    //     } else {
    //         dispatch(fetchAllDetails())
    //     }

    // }, [searchParams])
    useEffect(() => {
            if (searchParams.size === 0) {
                fetchData()
            }
        }, [searchParams])

    useEffect(() => {
        
        dispatch(fetchAllDetails())
    }, [])

    useEffect(() => {
        const tempArr = []
        tags?.forEach(tag => {
            const obj = { value: tag._id, label: tag?.name }
            tempArr.push(obj)
        })
        setOptions(tempArr)
    }, [tags])

    useEffect(() => {


        if (actionRef.current === "addTag" && status === statusSuccess) {
            console.log(("tag check 2"));
            closeTagModalBtnRef.current.click()
            addLeadOpenBtnRef.current.click()
            setNewTag("")
            actionRef.current = undefined
        }

        if (actionRef.current === "newLead" && status === statusSuccess) {
            addLeadCloseBtnRef.current.click()
            setFormData({
                name: "", agent: "", source: "", status: "", priority: "",
                timeToClose: "", tags: []
            })
            actionRef.current = undefined
        }
    }, [status])

    function onChangeFormHandler(e) {
        const { value, name } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function onChangeSelectTags(selectedOptions) {

        const tags = selectedOptions.map(tag => tag.value)
        setFormData(prev => ({
            ...prev,
            tags
        }))
    }

    function addTagHandler() {

        actionRef.current = "addTag"
        dispatch(addTag(newTag))
    }

    function onSubmitHandler(e) {
        const {
            name, agent, source, status, priority, timeToClose, tags } = formData

        if (!name || !agent || !source || !status || !priority || !timeToClose || tags.length == 0) {
            toast.error("All feilds required")
            return
        }
        actionRef.current = "newLead"
        dispatch(addLead(formData))
    }

    // FILTER
    const updateFilter = (key, value) => {
        if (value === "all") {
            setSearchParams({})
        } else {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(key, value);
            setSearchParams(newParams);
        }
    };

    return (
        <>
            <section className=" container mt-3 p-0">
                {/* sidebar */}
                <div className="d-flex  gap-2 ">
                    <div className="" style={{ width: "15rem" }}>
                        <Sidebar />
                    </div>
                    {/* component */}

                    <div className=" w-100 ">

                        {(componentParams === 'home' || componentParams === undefined) &&
                            (<div>
                                {/* Highlight & filter bar  */}
                                <div className="fw-semibold d-flex align-items-center justify-content-between px-1" style={{ height: "3.5rem" }}>
                                    {
                                        mdScrn < width && <div className="d-flex gap-4">
                                            <span>Lead Status:</span>

                                            <div className="">
                                                <p className="btn btn-sm position-relative m-0  border-0 fw-semibold">
                                                    New
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        {leads?.filter(lead => lead.status === "New")?.length}
                                                        <span className="visually-hidden">unread messages</span>
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p type="" className="btn btn-sm position-relative m-0  border-0 fw-semibold">
                                                    Contacted
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {leads?.filter(lead => lead.status == "Contacted")?.length}
                                                        <span className="visually-hidden">unread messages</span>
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p type="" className="btn btn-sm position-relative m-0  border-0 fw-semibold">
                                                    Qualified
                                                
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {leads?.filter(lead => lead.status == "Qualified")?.length}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    {/* filter */}
                                    <div className=" d-flex gap-3">

                                        <select
                                            className="form-select-sm rounded"
                                            aria-label="Default select example"
                                            onChange={(e) => updateFilter("status", e.target.value)}
                                        >
                                            <option className="" value={"all"} >Select</option>
                                            {
                                                leadStatus.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))
                                            }
                                        </select>
                                        <div className="">
                                            <button
                                                ref={addLeadOpenBtnRef}
                                                className="btn-sm btn btn-outline-primary"
                                                data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"
                                            >
                                                Add Lead
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                <hr className="m-1" style={{ opacity: "15%" }} />
                                {/* {componentParams ? components[componentParams] : "No components"} */}
                            </div>
                            )
                        }

                        <div>
                            {
                                status === 'loading' ? (
                                    <div className="text-center my-5">
                                        <span className="loader"></span>
                                    </div>
                                ) : (
                                    <div className=" ">
                                        {componentParams != undefined ? components[componentParams] : <LeadOverview />}
                                    </div>
                                )
                            }

                        </div>




                    </div>

                </div>
            </section>

            {/* modal - Add new lead */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Lead</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-2">
                                    <label htmlFor="lead-name" className="col-form-label">Lead Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        id="lead-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => onChangeFormHandler(e)}
                                    />
                                </div>
                                {/* Agent */}
                                <div className="mb-2">
                                    <label htmlFor="agent" className="col-form-label">Sales Agent:</label>
                                    <select className="form-select" name="agent" onChange={(e) => onChangeFormHandler(e)} aria-label="Default select example">
                                        <option className="" value={""}>--Select--</option>
                                        {
                                            agents?.map(option => (
                                                <option key={option?.email} value={option?._id}>{option?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="d-flex gap-2 justify-content-between">

                                    {/* Lead Source: */}
                                    <div className="mb-2 w-100">
                                        <label htmlFor="lead-name" className="col-form-label">Lead Source:</label>
                                        <select className="form-select" name="source" onChange={(e) => onChangeFormHandler(e)} aria-label="Default select example">
                                            <option className="" value={""}>--Select--</option>
                                            {
                                                leadSourceList?.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {/* Lead Status: */}
                                    <div className="mb-2 w-100">
                                        <label htmlFor="lead-name" className="col-form-label">Lead Status:</label>
                                        <select className="form-select" name="status" onChange={(e) => onChangeFormHandler(e)} aria-label="Default select example">
                                            <option className="" value={""}>--Select--</option>
                                            {
                                                leadStatus?.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className="d-flex gap-2 justify-content-between mb-2">
                                    {/* Priority */}
                                    <div className="mb-2 w-100">
                                        <label htmlFor="lead-name" className="col-form-label">Priority:</label>
                                        <select className="form-select" name="priority" onChange={(e) => onChangeFormHandler(e)} aria-label="Default select example">
                                            <option className="" value={""}>--Select--</option>
                                            {
                                                priorityList?.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {/* Time to Close */}
                                    <div className="mb-2">
                                        <label htmlFor="timeToClose" className="col-form-label">Close Time:</label>
                                        <input type="text"
                                            className="form-control"
                                            id="timeToClose"
                                            name="timeToClose"
                                            value={formData.timeToClose}
                                            placeholder="Ex: 10"
                                            onChange={(e) => onChangeFormHandler(e)}
                                        />
                                    </div>
                                </div>

                                {/* TAGS */}
                                <div className="mb-2 d-flex justify-content-between gap-3 align-items-center">
                                    <div className="w-75">
                                        <label htmlFor="" >Tags</label>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            // defaultValue={[colourOptions[4], colourOptions[5]]}
                                            isMulti
                                            options={options}
                                            onChange={onChangeSelectTags}
                                        />
                                    </div>
                                    <div className="w-25 mt-3">
                                        <p

                                            className="btn btn-sm btn-warning float-end my-auto" data-bs-toggle="modal" data-bs-target="#exampleModalTag">
                                            create Tag
                                        </p>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={addLeadCloseBtnRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button ref={addLeadBtnRef} type="button" className="btn btn-primary" onClick={onSubmitHandler}>Add</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* create Tag modal */}

            <div className="modal fade" id="exampleModalTag" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Tag</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Tag Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="tag"
                                    id="exampleFormControlInput1"
                                    value={newTag}
                                    onChange={(e) => { setNewTag(e.target.value) }}
                                />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button ref={closeTagModalBtnRef} type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={addTagHandler} type="button" className="btn btn-sm btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}