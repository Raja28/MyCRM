import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"


export default function LeadOverview() {
    const { leads } = useSelector(state => state.lead)
    const { loading } = useFetch()

    return (
        <>
            <section className="">
                {

                    loading ? (
                        <>
                            <div className="text-center my-5">
                                <div className="d-flex flex-column align-items-center">
                                    <span className="loader"></span>
                                    <small className="text">Loading...</small>

                                </div>

                            </div>
                        </>
                    ) :
                        (<div className="row ">
                            {leads?.length > 0 ?
                                (leads?.map((lead, index) => (
                                    <div key={lead._id + index} className="col-lg-4 col-md-6 my-3 ">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">{lead?.name}</h5>
                                                <div className="card-text  mb-1">
                                                    <div className="d-flex gap-2">
                                                        <h6>Agent: </h6>
                                                        <small>{lead.salesAgent.name}</small>
                                                    </div>
                                                </div>
                                                <Link to={`leadDetail/${lead._id}`} className="btn btn-primary float-end">Details</Link>
                                            </div>
                                        </div>
                                    </div>

                                ))) :
                                (
                                    <div className="text-center my-5">
                                        <span>No Lead Available</span>
                                    </div>


                                )
                            }
                        </div>)
                }
            </section>
        </>
    )
}