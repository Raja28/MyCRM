import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ADDAGENT, ADDCOMMENT, ADDLEAD, ADDNEWTAG, GET_ALL_AGENT, GETALLDETAILS, UPDATELEAD } from "../utils/api"
import toast from "react-hot-toast";


export const fetchAllDetails = createAsyncThunk('posts/fetchAllDetails', async (undefined, { rejectWithValue }) => {
    try {
        const resp = await axios.get(GETALLDETAILS)
        return resp?.data?.data
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
    }
})

export const addAgent = createAsyncThunk('posts/addAgent', async (data, { rejectWithValue }) => {
    try {
        const resp = await axios.post(ADDAGENT, data);
        if (resp?.data?.success) {
            toast.success("Agent Addedd Successfully")
        }
        return resp?.data?.agent
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
    }
})


export const addTag = createAsyncThunk('posts/addTag', async (tag, { rejectWithValue }) => {
    try {
        const resp = await axios.post(ADDNEWTAG, { tag })
        if (resp?.data?.success) {
            toast.success("Tag Added Successfully")
        }
        return resp?.data?.tag
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
    }
})

export const updateLead = createAsyncThunk('posts/updateLead', async (data, { rejectWithValue }) => {
    try {
    
        const resp = await axios.post(UPDATELEAD, data)

        if (resp?.data.success) {
            toast.success("Lead Updated")
        }
        return resp?.data?.lead
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data.message)
        return rejectWithValue(error.response.data.message)
    }
})

export const getAllAgents = createAsyncThunk('posts/getAllAgents', async (undefined, { rejectWithValue }) => {
    try {

        const resp = await axios.get(GET_ALL_AGENT)
        return resp?.data?.agents
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
    }
})

export const addLead = createAsyncThunk("posts/addLead", async (data, { rejectWithValue }) => {
    try {
        const resp = await axios.post(ADDLEAD, data)
        if (resp?.data?.success) {
            toast.success("Lead Added Successfully")
        }
        return resp.data?.lead
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
    }
})

export const addComment = createAsyncThunk('posts/addComments', async (data, { rejectWithValue }) => {
    try {
        const resp = await axios.post(ADDCOMMENT, data)
        if (resp?.data?.success) {
            toast.success("Comment Added")
        }
        return resp.data?.data
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)

    }
})

// const dummyAgents = [
//     { name: "Arvidh Kumar", email: "arvindhkumar@gmail.com" },
//     { name: "Sreenath", email: "sreenath@gmail.com" },
//     { name: "Rahul M", email: "rahul@gmail.com" },
//     { name: "Surya", email: "surya@gmail.com" },
//     { name: "Saravana Bhavan", email: "raina@haryana.com" }
// ]

const initialState = {
    leads: sessionStorage.getItem('leads') !== null ? JSON.parse(sessionStorage.getItem('leads')) : [],
    agents: sessionStorage.getItem('agents') !== null ? JSON.parse(sessionStorage.getItem('agents')) : [],
    tags: sessionStorage.getItem('tags') !== null ? JSON.parse(sessionStorage.getItem('tags')) : [],
    status: 'idle',
    error: null
}

export const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {
        setLeads: (state, { payload }) => {

            state.leads = payload
            sessionStorage.setItem('leads', JSON.stringify(payload))
        },
        setStatus: (state, { payload }) => {
            state.status = "loading"
        }
    },

    extraReducers: (builder) => {
        builder.addCase(addAgent.pending, (state) => {
            state.status = "loading"
        })
            .addCase(addAgent.fulfilled, (state, { payload }) => {

                const tempAgent = [...state.agents]
                state.agents = [payload, ...tempAgent]
                sessionStorage.setItem('agents', JSON.stringify(state.agents))
                state.status = 'success'
            })
            .addCase(addAgent.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
            .addCase(addLead.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addLead.fulfilled, (state, { payload }) => {
                if (state.leads.length != 0) {
                    const tempLead = [...state.leads]
                    state.leads = [payload, ...tempLead]
                } else {

                    state.leads = [payload]
                }
                sessionStorage.setItem('leads', JSON.stringify(state.leads))
                state.status = "success"
            })
            .addCase(addLead.rejected, (state, { payload }) => {
                state.error = payload
                state.status = "error"
            })
            .addCase(getAllAgents.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getAllAgents.fulfilled, (state, { payload }) => {
                state.agents = payload
                sessionStorage.setItem('agents', JSON.stringify(state.agents))
                state.status = "success"
            })
            .addCase(getAllAgents.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
            .addCase(addTag.pending, (state) => {
                state.status = "loading"
            })
            .addCase(addTag.fulfilled, (state, { payload }) => {
                const tempTags = state.tags
                state.tags = [payload, ...tempTags]
                sessionStorage.setItem('tags', JSON.stringify(state.tags))
                state.status = "success"
            })
            .addCase(addTag.rejected, (state, { payload }) => {
                state.status = 'error'
                state.error = payload
            })
            .addCase(fetchAllDetails.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchAllDetails.fulfilled, (state, { payload }) => {
                state.leads = payload.leads
                state.agents = payload.agents
                state.tags = payload.tags
                sessionStorage.setItem('leads', JSON.stringify(state.leads))
                sessionStorage.setItem('agents', JSON.stringify(state.agents))
                sessionStorage.setItem('tags', JSON.stringify(state.tags))
                state.status = "success"
            })
            .addCase(fetchAllDetails.rejected, (state, { payload }) => {
                state.status = "error"
                state.error = payload
            })
            .addCase(updateLead.pending, (state) => {
                state.status = "loading"
            })
            .addCase(updateLead.fulfilled, (state, { payload }) => {

                const tempLeads = state.leads
                // const oldLeadIndex = state.leads.indexOf(lead => lead._id === payload._id)
                // tempLeads.splice(oldLeadIndex, 1, payload)
                // state.leads = tempLeads
                const oldLeadIndex = state.leads.findIndex(lead => lead._id === payload._id);

                if (oldLeadIndex !== -1) {
                    state.leads[oldLeadIndex] = payload;
                }
          
                sessionStorage.setItem('leads', JSON.stringify(state.leads))
                state.status = "success"
            })
            .addCase(updateLead.rejected, (state, { payload }) => {
                state.status = "error"
                state.error = payload
            })
            .addCase(addComment.pending, (state) => {
                state.status = "loading"
            })
            .addCase(addComment.fulfilled, (state, { payload }) => {
                const tempLead = state?.leads.find(lead => lead._id === payload?.leadId)
                tempLead.comments = payload.comments
                const allLead = state.leads
                allLead?.sort((l1, l2) => l2.createdAt - l1.createdAt)
                state.leads = allLead
                state.status = "success"
            })
            .addCase(addComment.rejected, (state, { payload }) => {
                state.status = "error"
                state.error = payload
            })
    }
})
export const { setLeads } = leadSlice.actions
export default leadSlice.reducer