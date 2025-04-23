import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";

import makeAnimated from 'react-select/animated';
import { updateLead } from "../features/lead";
import Comments from "../components/Comments";

const leadStatus = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"]
const leadSourceList = ["Website", "Referral", "Cold Call", "Advertisment", "Email", "Other"]
const priorityList = ["High", "Medium", "Low"]
const statusSuccess = "success"
export default function LeadManager() {
    // const options = []
    const animatedComponents = makeAnimated()
    const { status, leads, agents, tags, error } = useSelector(state => state.lead)
    const [lead, setLead] = useState(null)
    const [edit, setEdit] = useState(false)
    const [options, setOptions] = useState([])
    const [userSelectedTags, setUserSelectedTags] = useState([])
    const [agentList, setAgentList] = useState()
    // leadAction/:leadId"
    const { leadAction, leadId } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        
        const lead = leads?.find(lead => lead._id == leadId)
     
        setLead(lead)
        
        const tempArr = []
        tags?.forEach(tag => {
            const obj = { value: tag._id, label: tag?.name }
            tempArr.push(obj)
        })
        setOptions([...tempArr])
        
        if (status === statusSuccess) {

            setEdit(false)
        }
    }, [ leadId, leads])


    useEffect(() => {
        if (!lead || options.length == 0) return;
        //find the index of selected tags by user
        const tempTagArr = []
        lead?.tags.forEach(userTag => {
            tempTagArr.push(options?.find((tag, index) => tag.value === userTag?._id))
        })
        setLead(prev => ({
            ...prev,
            tags: [...tempTagArr]
        }))
        setUserSelectedTags(tempTagArr)
    }, [options])

    function onChangeData(e) {
        const { name, value } = e.target

        if (name === "salesAgent") {
            setLead(prev => ({
                ...prev,
                [name]: JSON.parse(value)
            }))
        } else {

            setLead(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    function tagHandler(selectedOptions) {
        // const tags = selectedOptions.map(tag => tag.value)
        setUserSelectedTags(selectedOptions)
        setLead({ ...lead, tags: [...selectedOptions] })
    }

    function updateHandler() {
        dispatch(updateLead(lead))
    }


    return (
        <>
            <section className="container d-flex gap-3 mb-4">
                {/* side bar */}
                <div className=" mt-0 p-0 mt-4 " style={{ width: "15rem" }}>
                    <div className=" d-flex justify-content-center">
                        <Link to={-1} className=" text-dark btn btn-sm fw-semibold">Back</Link>
                    </div>
                    <hr className="" style={{ opacity: "15%" }} />
                </div>

                {/* header */}
                <div className=" mt-4 w-100 d-flex flex-column ">
                    <div className=" mx-auto">
                        <h4 className="m-0">Lead Manager</h4>
                    </div>
                    <hr className="" style={{ opacity: "15%" }} />

                    <div>
                        {
                            leadId && <div>
                                <div className="mb-3">
                                    <label htmlFor="lead" className="form-label">Lead Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lead"
                                        name="name"
                                        disabled={edit ? false : true}
                                        value={lead?.name}
                                        onChange={(e) => onChangeData(e)}
                                    />
                                </div>
                                {/* Agent */}
                                <div className="mb-2">
                                    <label htmlFor="agent" className="col-form-label">Sales Agent:</label>
                                    <select
                                        className="form-select"
                                        name="salesAgent"
                                        disabled={edit ? false : true}
                                        aria-label="Default select example"
                                        onChange={(e) => onChangeData(e)}
                                    >
                                        <option className="" value={JSON.stringify(lead?.salesAgent)}>{lead?.salesAgent.name}</option>
                                        {
                                            agents?.map(option => {
                                                if (option._id !== lead?.salesAgent._id) {
                                                    return <option key={option?.email} value={JSON.stringify(option)}>{option?.name}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                {/* Source */}
                                <div className="mb-2">
                                    <label htmlFor="source" className="col-form-label">Lead Source:</label>
                                    <select
                                        className="form-select"
                                        name="source"
                                        disabled={edit ? false : true}
                                        aria-label="Default select example"
                                        onChange={(e) => onChangeData(e)}
                                    >
                                        <option className="" value={lead?.source}>{lead?.source}</option>
                                        {
                                            leadSourceList?.map(option => {
                                                if (option !== lead?.source) {
                                                    return <option key={option} value={option}>{option}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="mb-2">
                                    <label htmlFor="status" className="col-form-label">Lead Status:</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        disabled={edit ? false : true}
                                        aria-label="Default select example"
                                        onChange={(e) => onChangeData(e)}
                                    >
                                        <option className="" value={lead?.status}>{lead?.status}</option>
                                        {
                                            leadStatus?.map(option => {
                                                if (option !== lead?.status) {
                                                    return <option key={option} value={option}>{option}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </div>

                                {/* Priority */}
                                <div className="mb-2">
                                    <label htmlFor="priority" className="col-form-label">Priority:</label>
                                    <select
                                        className="form-select"
                                        name="priority"
                                        disabled={edit ? false : true}
                                        aria-label="Default select example"
                                        onChange={(e) => onChangeData(e)}
                                    >
                                        <option className="" value={lead?.priority}>{lead?.priority}</option>
                                        {
                                            priorityList?.map(option => {
                                                if (option !== lead?.priority) {
                                                    return <option key={option} value={option}>{option}</option>
                                                }
                                            })
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
                                        value={lead?.timeToClose}
                                        placeholder="Ex: 10"
                                        disabled={edit ? false : true}
                                        onChange={(e) => onChangeData(e)}
                                    />
                                </div>

                                {/* TAGS */}
                                <div className="mb-2 d-flex justify-content-between gap-3 align-items-center">
                                    <div className="w-100">
                                        <label htmlFor="mb-1" >Tags</label>
                                        <Select
                                            className="w-100"
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            // defaultValue={userSelectedTags}
                                            value={userSelectedTags}
                                            isMulti
                                            options={options}
                                            onChange={tagHandler}

                                            isDisabled={!edit}
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    {
                                        edit ? (
                                            <div className="d-flex gap-3  justify-content-end my-4">
                                                <p
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => setEdit(false)}
                                                    disabled={status === 'loading' ? true : false}
                                                >
                                                    Cancel

                                                </p>
                                                <p
                                                    className="btn btn-sm btn-success"
                                                    disabled={status === 'loading' ? true : false}
                                                    onClick={updateHandler}
                                                >
                                                    Update

                                                </p>
                                            </div>) : (

                                            <div className="my-4">
                                                <p
                                                    className="float-end btn btn-sm btn-primary"
                                                    onClick={() => setEdit(true)}

                                                >
                                                    Edit

                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    {/* Comment section */}
                    <div>
                        <Comments leadId={leadId} salesAgentId={lead?.salesAgent?._id} comments={lead?.comments} />
                    </div>


                </div>

            </section>
        </>
    )
}