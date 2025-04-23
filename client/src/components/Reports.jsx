import { Chart, ArcElement } from "chart.js/auto"
import { useEffect, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2"
import { useSelector } from "react-redux"

Chart.register(ArcElement);


export default function Reports() {
    const [leadClosed, setLeadClosed] = useState(0)
    const [leadPipeline, setLeadPipeline] = useState(0)
    const { leads } = useSelector(state => state.lead)

    useEffect(() => {
        setLeadClosed(leads?.filter(lead => lead.status === "Closed").length)
        setLeadPipeline(leads?.length - leadClosed)
    }, [])
   
    const data = {
        labels: [`${leadClosed} Lead Closed`, `${leadPipeline} Lead in pipeline`],
        datasets: [
            {
                label: 'Lead Report',
                data: [leadClosed, leadPipeline],
                backgroundColor: [
                    'rgba(3, 73, 31, 0.88)',
                    'rgba(201, 124, 41, 0.97)',
                    // 'rgba(255, 206, 86, 0.5)',
                    // 'rgba(75, 192, 192, 0.5)',
                    // 'rgba(153, 102, 255, 0.5)',
                    // 'rgba(255, 159, 64, 0.5)'
                ],
                // borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        // scales: {
        //     y: {
        //         beginAtZero: true
        //     }
        // }
    };
    return (
        <>
            <section className="container  mb-4">
                <div>
                    {/* header */}
                    <div className=" mt-1 mx-auto  text-center d-flex flex-column justify-content-evenly">
                        <h4 className="">Report</h4>
                        <hr className=" " style={{ opacity: "15%" }} />
                    </div>
                    <div className="card p-2" >
                        <div className="card-body  d-flex justify-content-center" style={{ maxHeight: "30rem" }}>
                            <Pie data={data} options={options} className="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}