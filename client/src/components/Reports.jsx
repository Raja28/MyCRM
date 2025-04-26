import { Chart, ArcElement } from "chart.js/auto"
import { useEffect, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2"
import { useSelector } from "react-redux"

Chart.register(ArcElement);
import { subDays } from 'date-fns';


export default function Reports() {
    const [leadClosed, setLeadClosed] = useState(0)
    const [leadPipeline, setLeadPipeline] = useState({})
    const [agentData, setAgentData] = useState({})
    const [leadClosedLastWeek, setLeadClosedLastWeek] = useState({})
    const { leads, agents } = useSelector(state => state.lead)

    useEffect(() => {

        const agentCount = {};
        const leadInPipeLine = {};

        leads.forEach(lead => {
            agentCount[lead.salesAgent.name] = agentCount[lead.salesAgent.name] ? agentCount[lead.salesAgent.name] + 1 : 1
            if (lead.status !== "Closed") {
                leadInPipeLine[lead.status] = leadInPipeLine[lead.status] ? leadInPipeLine[lead.status] + 1 : 1;
            }
        })
        setAgentData(agentCount)
        setLeadPipeline(leadInPipeLine)

        const sevenDaysAgo = subDays(new Date(), 7);

        // Step 1: Filter leads closed in the last 7 days
        const recentClosed = leads.filter(lead =>
            lead.status === 'Closed' &&
            new Date(lead.updatedAt) >= sevenDaysAgo
        );
        // console.log("recentClosed", recentClosed);

        // Step 2: Count by agent name
        const closedLeadData = {};

        recentClosed.forEach(lead => {
            closedLeadData[lead.salesAgent.name] = closedLeadData[lead.salesAgent.name] ? closedLeadData[lead.salesAgent.name] + 1 : 1
        });
        // console.log(closedLeadData);
        setLeadClosedLastWeek(closedLeadData)

    }, [])


    const data = {
        labels: Object.keys(agentData),

        datasets: [
            {
                label: 'Lead Report',
                data: Object.values(agentData),
                backgroundColor: [
                    'rgba(3, 73, 31, 0.88)',
                    'rgba(201, 124, 41, 0.97)',
                    '#ff6384',
                    '#36a2eb',
                    '#ffcd56'
                ],
                borderColor: 'rgba(0,0,0,0.1)',
                borderWidth: 1
            }
        ]
    };


    const pipelineLabels = Object.keys(leadPipeline);
    const pipelineCounts = Object.values(leadPipeline);

    const pipelineData = {
        labels: pipelineLabels,
        datasets: [
            {
                label: 'Pipeline Leads',
                data: pipelineCounts,
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }
        ]
    };
    // Lead in Pipeline
    const pipelineOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                precision: 0
            }
        }
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Hides labels on top or side of chart
            },
            tooltip: {
                enabled: true // Shows label on hover
            }
        },
    };

    const leadClosedLastWeekData = {
        labels: Object.keys(leadClosedLastWeek),
        datasets: [
            {
                label: 'Pipeline Leads',
                data: Object.values(leadClosedLastWeek),
                backgroundColor: 'rgba(36, 75, 190, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }
        ]
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

                    {/* Lead distribution by sales agent */}
                    {agentData &&
                        <div className=" d-flex gap-3 flex-wrap flex-lg-nowrap justify-content-between align-items-center">
                            <div className="w-100 text-sm-center">
                                <p className="fw-semibold">Lead distribution by sales agent</p>
                            </div>

                            <div className="card p-2 w-100">
                                <div className="card-body  d-flex justify-content-center" style={{ maxWidth: "25rem" }}>
                                    <Pie data={data} options={options} className="" />
                                </div>
                            </div>
                        </div>
                    }
                    {/* Total Leads in Pipeline */}
                    <div>
                        {pipelineData &&
                            <div className="card p-3 mt-4 ">
                                <h5 className="mb-3 mx-auto">Total Leads in Pipeline</h5>
                                <Bar data={pipelineData} options={pipelineOptions} />
                            </div>
                        }

                    </div>

                    {/* Total Leads in Pipeline */}
                    <div>
                        {leadClosedLastWeekData &&
                            <div className="card p-3 mt-4 ">
                                <h5 className="mb-3 mx-auto">Leads closed last week</h5>
                                <Bar data={leadClosedLastWeekData} options={pipelineOptions} />
                            </div>
                        }

                    </div>

                </div>
            </section>
        </>
    )
}