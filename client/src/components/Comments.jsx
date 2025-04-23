import { useEffect, useState, useRef } from "react"
import useFetch from "../hooks/useFetch"
import { useDispatch, useSelector } from "react-redux"
import { addComment } from "../features/lead"
import { BiComment } from "react-icons/bi";

export default function Comments({ leadId, salesAgentId, comments }) {

    const { status, error, } = useSelector(state => state.lead)
    // console.log(comments);

    const [newComment, setNewComment] = useState('')
    const dispatch = useDispatch()
    const modalCloseBtnRef = useRef()

    useEffect(() => {
        modalCloseBtnRef.current.click()
    }, [status])

    function commentHandler() {
        const commentData = {
            leadId,
            salesAgent: salesAgentId,
            comment: newComment
        }
        dispatch(addComment(commentData))
    }

    return (
        <>
            <hr className="" style={{ opacity: "15%" }} />
            <div className="my-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Lead Comments</h5>
                    <div className="btn btn-sm btn-secondary"
                        data-bs-toggle="modal" data-bs-target="#commentModal"
                    >
                        Add Comment

                    </div>
                </div>

                <div>
                    {/* Loading */}
                    {
                        status === 'loading' && <div className="my-5">loading...</div>
                    }
                    {
                        status === "error" && <div className="my-5">{error}</div>
                    }
                </div>

                {
                    comments?.length > 0 ? (
                        <div className="my-3">
                            <ul className="list-group">
                                {
                                    comments?.map(comment => (
                                        <li key={comment?._id} className="list-group-item">
                                            <div className="d-flex gap-3">
                                                <span className="fw-semibold">
                                                    {comment.author.name}
                                                </span>
                                                <span className="text-sm text-secondary">
                                                    {new Date(comment?.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="">
                                                <span className="">
                                                    <BiComment />
                                                </span>
                                                <span className="mx-2">
                                                    {comment?.commentText}

                                                </span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ): (
                        <div className="my-3  text-center">
                            <hr className="" style={{ opacity: "15%" }} />
                            <span className="">No Comment Added</span>
                        </div>
                    )
                }
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Comment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Write Comment</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    onChange={(e) => setNewComment(e.target.value)}
                                >

                                </textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal" ref={modalCloseBtnRef}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={commentHandler}>Add Commnet</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}