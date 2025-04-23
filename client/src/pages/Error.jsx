import { Link } from "react-router-dom";

export default function Error() {
    // const {} = useSelector()
    return (
        <>
            <section className="w-100 h-100 ">
                <div className="">
                    <span>{"ERROR"}</span>
                    <Link to={"/"} className="btn btn-warning">Home</Link>
                </div>
            </section>
        </>
    )
}