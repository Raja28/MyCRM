
const SalesAgent = require("../models/salesAgent");
const Tag = require("../models/tags");
const Lead = require("../models/lead");
const Comment = require("../models/comments")
const mongoose = require("mongoose");
const Comments = require("../models/comments");


exports.addAgent = async (req, res) => {
    try {
        const { name, email } = req.body


        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "All feilds required",
            })
        }

        const userExists = await SalesAgent.findOne({ email: email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Agent Email Exists"
            })
        }

        const newAgent = await SalesAgent.create({ name, email })

        if (newAgent) {
            return res.status(201).json({
                success: true,
                message: "New agent added successfully.",
                agent: newAgent
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.addLead = async (req, res) => {
    try {
        const { name, agent, source, status, priority, timeToClose, tags } = req.body

        const leadExist = await Lead.findOne({ name })

        if (leadExist) {
            return res.status(400).json({
                success: false,
                message: "Lead already exist"
            })
        }

        const newLead = await Lead.create({
            name,
            source,
            salesAgent: agent,
            status,
            tags,
            timeToClose,
            priority
        })

        try {

            const lead = await Lead.findById(newLead._id)
                .populate('salesAgent')
                .populate('tags')
                .populate('comments')


            return res.status(201).json({
                success: true,
                message: "Lead Added",
                lead
            })
        } catch (error) {
            console.log(error);

            return res.status(400).json({
                success: false,
                message: "Failed to create lead, Try again"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.updateLead = async (req, res) => {
    try {
        // name:string, comments:[{}], priority:string, salesAgent:{}, source:string, status:string, tags:[{}], timeToClose:string,
        const { name, comments, priority, salesAgent, source, status, tags, timeToClose, _id } = req.body



        try {
            const lead = await Lead.findOne({ _id: new mongoose.Types.ObjectId(_id) })

            if (name) lead.name = name;
            if (priority) lead.priority = priority
            if (source) lead.source = source
            if (status) lead.status = status
            if (timeToClose) lead.timeToClose = timeToClose

            if (tags?.length > 0) {

                const tagsIds = tags.map(tag => tag.value)
                lead.tags = tagsIds
            }
            if (salesAgent) lead.salesAgent = salesAgent._id

            await lead.save()

            const updatedLead = await Lead.findById(_id)
                .populate('salesAgent')
                .populate('tags')
                .populate('comments')
           

            return res.status(200).json({
                success: true,
                message: "Lead Updated",
                lead: updatedLead
            })

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                message: "Failed to update lead. Try again"
            })
        }



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
}

exports.getAllAgents = async (req, res) => {
    try {
        const sort = { createdAt: -1 };
        const agents = await SalesAgent.find().sort(sort)

        return res.status(200).json({
            success: true,
            message: "Fetched all agengts",
            agents
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.getAllLeads = async (req, res) => {

    try {
        const tags = await Tag.find()
        const agents = await SalesAgent.find()
        const leads = await Lead.find()
            .populate('salesAgent')
            .populate('tags')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'name'
                }
            })
            .sort({ createdAt: -1 })

        res.status(201).json({
            success: true,
            message: "Fetched Successfully",
            data: {
                leads,
                tags,
                agents
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.addComments = async (req, res) => {

    const { leadId, comment, salesAgent } = req.body

    if (!mongoose.Types.ObjectId.isValid(leadId) || !mongoose.Types.ObjectId.isValid(salesAgent)) {
        return res.status(400).json({
            success: false,
            message: "Invalid leadId"
        })
    }

    try {
        const newComment = await Comments.create({
            lead: leadId,
            author: salesAgent,
            commentText: comment
        })

        if (newComment) {
            const addedNewCommentToLead = await Lead.findByIdAndUpdate(leadId,
                { $push: { comments: newComment._id } },
                { new: true }
            )

            const allComments = await Comments.find({ lead: leadId })
                .populate('author', "name")
                .sort({ createdAt: -1 })

            return res.status(201).json({
                success: true,
                message: "Comment Added",
                data: {
                    leadId,
                    comments: allComments
                }
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error creating new comment",
        })
    }
}

exports.addNewTag = async (req, res) => {
    try {
        const { tag } = req.body

        if (!tag) {
            return res.status(500).json({
                success: false,
                message: "Tag required"
            })
        }

        const tagExists = await Tag.findOne({ name: tag })

        if (tagExists) {
            return res.status(500).json({
                success: false,
                message: "Tag Exists"
            })
        }
        const newTag = await Tag.create({
            name: tag
        })
        res.status(201).json({
            success: true,
            message: "Tag Added Successfully",
            tag: newTag
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server error",

        })
    }
}

///TODO
exports.getComments = async (req, res) => {
    try {
        const { leadId } = req.query


        const allComments = await Comments.findById({ _id: leadId })
            .populate("author", "name")
            .sort({ createdAt: -1 })

        if (allComments) {
            res.status(201).json({
                success: true,
                message: "comments fetched",
                comments: allComments
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",

        })
    }
}

exports.getFilterLead = async (req, res) => {
    try {

        const { status, tag, source, salesAgent, priority, timeToClose } = req.query

        let leads
        if (status || tag || source || salesAgent || priority || timeToClose) {


            try {

                const filter = {};
                if (status) filter.status = status;
                if (priority) filter.priority = priority

                // if (tags) filter.tags = tags;
                if (tag) {
                    const fetchedTag = await Tag.findOne({ name: tag });
                    if (fetchedTag) {
                        filter.tags = fetchedTag._id;
                    }
                }

                if (source) filter.source = source;

                if (salesAgent) {
                    const agent = await SalesAgent.findOne({ name: salesAgent });
                    filter.salesAgent = agent._id;
                }

                leads = await Lead.find(filter)
                    .populate('salesAgent')
                    .populate('tags')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'author',
                            select: 'name'
                        }
                    })
                    .sort({ timeToClose: timeToClose ? +timeToClose : 1 })

            } catch (error) {
                console.log("filter errr:", error)
                return res.status(400).json({
                    success: false,
                    message: error?.message
                })
            }
        } else {

            leads = await Lead.find()
                .populate('salesAgent')
                .populate('tags')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'author',
                        select: 'name'
                    }
                })
                .sort({ createdAt: -1 })
        }
        return res.status(201).json({
            success: true,
            message: "Fetched lead by status",
            leads
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// exports.getFilterLead = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// }