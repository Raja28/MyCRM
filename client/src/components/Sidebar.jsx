import { GoHome } from "react-icons/go";
import { PiLinktreeLogoLight } from "react-icons/pi";
import { FcSalesPerformance } from "react-icons/fc";
import { GrStatusUnknown } from "react-icons/gr";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const sidebarMenu = [
    { title: "Home", icon: GoHome },
    { title: "Lead", icon: PiLinktreeLogoLight },
    { title: "Sales", icon: FcSalesPerformance },
    { title: "Status", icon: GrStatusUnknown },
    { title: "Agents", icon: MdOutlinePersonOutline },
    { title: "Reports", icon: TbReportSearch },
    { title: "Settings", icon: IoSettingsOutline },
]
export default function Sidebar() {

    return (
        <>
            <section className=" mt-0 p-0" style={{ height: "calc(100vh - 90px)", }}>
                <div className="w-100" style={{ width: "5rem" }}>

                    <div className="">
                        {
                            sidebarMenu.map(item => (
                                <div key={item.icon} className={`my-3`}>
                                    <Link to={`/${item.title === "Home" ? "": (item.title).toLowerCase()}`} className={`btn d-flex p-1 fw-semibold align-items-center gap-2 my-2 mx-1 `}>
                                        <p className=" m-0" style={{ width: "1.5rem" }}>
                                            <item.icon style={{ width: "100%", height: "100%" }} />
                                        </p>
                                        <p className="fs-6  m-0">{item.title}</p>
                                    </Link>
                                    <hr className="m-0 mx-2" style={{opacity: "15%"}} />
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>
        </>
    )
}