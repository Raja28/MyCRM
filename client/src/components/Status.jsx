import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"




const leadStatus = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"]
const leadSourceList = ["Website", "Referral", "Cold Call", "Advertisment", "Email", "Other"]
const priorityList = ["High", "Medium", "Low"]
const timeToClose = ["ascending", "decending"]
const statusSuccess = "success"

export default function Status() {
    const { leads, agents, tags } = useSelector(state => state.lead)
    const [searchParams, setSearchParams] = useSearchParams();


    // FILTER
    const updateFilter = (key, value) => {

        const newParams = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            console.log("removing", key)
            newParams.delete(key);
        } else {
            newParams.set(key, value);
        }
        setSearchParams(newParams);


    };

    return (
        <>
            <section className="container  mb-4">
                <div>
                    {/* header */}
                    <div className=" mx-auto  text-center">
                        <h4 className="m-0">Status</h4>
                    </div>
                    <div className="">
                        <div className="d-flex gap-3 align-items-center">
                            <small className="m-0 fw-semibold " >Filter By:</small>
                            <div className="d-flex gap-3">
                                {/* status */}
                                <div>
                                    <select
                                        name=""
                                        id=""
                                        onChange={(e) => updateFilter("status", e.target.value)}
                                        className="form-select form-select-sm rounded-pill mb-1" >
                                        <option value="all">--Status--</option>
                                        {
                                            leadStatus.map(status => (
                                                <option key={status} value={status} >{status}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <select
                                        name="agent"
                                        id=""
                                        onChange={(e) => updateFilter("salesAgent", e.target.value)}
                                        className="form-select form-select-sm rounded-pill mb-1" >
                                        <option value="all">--Agent--</option>
                                        {
                                            agents?.map(agent => (
                                                <option key={agent._id} value={agent.name} >{agent.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* tag */}
                                {/* <div>
                                    <select
                                        name="tag"
                                        id=""
                                        onChange={(e) => updateFilter("tag", e.target.value)}
                                        className="form-select form-select-sm rounded-pill mb-1" >
                                        <option value="all">--Tag--</option>
                                        {
                                            tags?.map(tag => (
                                                <option key={tag._id} value={tag.name} >{tag.name}</option>
                                            ))
                                        }
                                    </select>
                                </div> */}
                                {/* Source */}
                                {/* <div>
                                    <select
                                        name="source"
                                        id=""
                                        onChange={(e) => updateFilter("source", e.target.value)}
                                        className="form-select form-select-sm rounded-pill mb-1" >
                                        <option value="all">--Source--</option>
                                        {
                                            leadSourceList?.map(source => (
                                                <option key={source} value={source} >{source}</option>
                                            ))
                                        }
                                    </select>
                                </div> */}

                                {/* priority */}
                                <div>
                                    <select
                                        name="priority"
                                        id=""
                                        onChange={(e) => updateFilter("priority", e.target.value)}
                                        className="form-select form-select-sm rounded-pill mb-1" >
                                        <option value="all">--Priority--</option>
                                        {
                                            priorityList?.map(priority => (
                                                <option key={priority} value={priority} >{priority}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* Time_To_Close */}
                                <div>
                                    <select
                                        name="timeToClose"
                                        id=""
                                        onChange={(e) => updateFilter("timeToClose", e.target.value)}
                                        className="form-select form-select-sm rounded-pill mb-1" >
                                        <option value="all">--Time--</option>
                                        {
                                            timeToClose?.map(time => (
                                                <option key={time} value={time} >{time}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr className="m-0 p-0" style={{ opacity: "15%" }} />
                    {/* TABLE */}
                    <div className="my-3">
                        <table className="table d-flex flex-column">
                            <thead className="">
                                <tr className=" d-flex justify-content-between w-100">
                                    {/*  <th scope="col">#</th> */}
                                    <th className="w-100">Lead Name</th>
                                    <th className="w-100">Sales Agent</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leads?.length != 0 ? (
                                        leads?.map(lead => (
                                            <tr key={lead?._id} className=" d-flex justify-content-between w-100">

                                                <td className="w-100">{lead?.name.length > 40 ? lead?.name.slice(0, 40) + "..." : lead?.name} </td>
                                                <td className="w-100">{lead?.salesAgent?.name}</td>

                                            </tr>
                                        ))
                                    ) : (
                                        <div className="text-center my-5">
                                            <span>No Lead Available</span>
                                        </div>
                                    )
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}