import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"

const leadStatus = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"]
const leadSourceList = ["Website", "Referral", "Cold Call", "Advertisment", "Email", "Other"]
const priorityList = ["High", "Medium", "Low"]
const timeToClose = ["ascending", "decending"]
const statusSuccess = "success"

export default function Lead() {
    const { leads, agents, tags } = useSelector(state => state.lead)
    const [searchParams, setSearchParams] = useSearchParams();
    const { fetchData } = useFetch()

    useEffect(() => {
        if (searchParams.size === 0) {
            fetchData()
        }
    }, [searchParams])

    // useEffect(() => {

    //     const query = {}
    //     if (searchParams.size > 0) {
    //         // const query = { status: searchParams.get('status') }
    //         if (searchParams.get('status')) {
    //             console.log(searchParams.get('status'));

    //             query.status = searchParams.get('status')
    //         }

    //         if (searchParams.get('salesAgent')) query.salesAgent = searchParams.get('salesAgent')

    //         if (searchParams.get('tags')) query.tags = searchParams.get('tags')

    //         if (searchParams.get('source')) query.source = searchParams.get('source')

    //     } else {
    //         // dispatch(fetchAllDetails())
    //     }
    //     // Only fetch data if the params exist
    //     if (Object.keys(query).length > 0) {
    //         // fetchData(query); // Fetch data based on query params
    //     }
    //     // fetchData(query)
    // }, [searchParams.toString()])

    // FILTER
    const updateFilter = (key, value) => {
        // console.log(key, value)
        // if (value === "all") {
        //     setSearchParams({})
        // } else {
        //     const newParams = new URLSearchParams(searchParams);
        //     newParams.set(key, value);
        //     setSearchParams(newParams);
        // }


        const newParams = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            console.log("removing", key)
            newParams.delete(key); // removes the `status` param
        } else {
            newParams.set(key, value);
        }
        setSearchParams(newParams);


        // console.log(newParams)

    };

    return (
        <section className="container  mb-4">
            <div className="">
                {/* header */}
                <div className=" mx-auto  text-center">
                    <h4 className="m-0">Lead List</h4>
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
                            <div>
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
                            </div>
                            {/* Source */}
                            <div>
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
            </div>
            {/* TABLE */}
            <div className="my-3">
                <table className="table d-flex flex-column">
                    <thead className="">
                        <tr className=" d-flex justify-content-between w-100">
                            {/*  <th scope="col">#</th> */}
                            <th className="w-100">Name</th>
                            <th className="w-100">Status</th>
                            <th className="w-100">Sales Agent</th>
                            <th className="w-100">Priority</th>
                            <th className="w-100">Time To Close</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leads?.length != 0 ? (
                                leads?.map(lead => (
                                    <tr key={lead?._id} className=" d-flex justify-content-between w-100">

                                        <td className="w-100">{lead?.name.length > 20 ? lead?.name.slice(0, 20) + "..." : lead?.name} </td>
                                        <td className="w-100">{lead?.status}</td>
                                        <td className="w-100">{lead?.salesAgent?.name}</td>
                                        <td className="w-100">{lead?.priority}</td>
                                        <td className="w-100">{lead?.timeToClose}</td>
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
        </section>
    )
}