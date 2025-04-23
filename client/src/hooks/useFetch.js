import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setLeads } from "../features/lead";


const BASEURL = import.meta.env.VITE_BASE_URL

export default function useFetch() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();

    // http://localhost:2025/lead

    const fetchData = useCallback(async (queryParams = {}) => {


        // if (Object.values(queryParams).length == 0) return
        // console.log("queryParams", queryParams);

        try {
            setLoading(true);
            setError(null);
            const resp = await axios.get(BASEURL + "lead/filter", {
                params: queryParams
            })

            if (resp?.data.success) {
                // console.log(resp?.data?.leads);

                dispatch(setLeads(resp?.data?.leads))
                setData(resp?.data?.comments)
            } else {
                setError("Failed to fetch data");
            }

        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "An error occurred")
        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {

        const query = {}
        if (searchParams.size > 0) {
            // const query = { status: searchParams.get('status') }
            if (searchParams.get('status')) {
                // console.log(searchParams.get('status'));

                query.status = searchParams.get('status')
            }

            if (searchParams.get('salesAgent')) query.salesAgent = searchParams.get('salesAgent')

            if (searchParams.get('tag')) query.tag = searchParams.get('tag')

            if (searchParams.get('source')) query.source = searchParams.get('source')
            if (searchParams.get('priority')) query.priority = searchParams.get('priority')
            if (searchParams.get('timeToClose')) query.timeToClose = searchParams.get('timeToClose') === "ascending" ? 1 : -1
            fetchData(query)

        }

    }, [searchParams.toString()])

    return { loading, error, data, fetchData }
}