"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
const JobStatus_1 = require("../enums/JobStatus");
class Proposal {
    id;
    projectId;
    freelancerId;
    coverLetter;
    proposedRate;
    proposedTimeline;
    createdAt;
    status;
    constructor(id, projectId, freelancerId, coverLetter, proposedRate, proposedTimeline, createdAt = new Date(), status = JobStatus_1.JobStatus.Review) {
        this.id = id;
        this.projectId = projectId;
        this.freelancerId = freelancerId;
        this.coverLetter = coverLetter;
        this.proposedRate = proposedRate;
        this.proposedTimeline = proposedTimeline;
        this.createdAt = createdAt;
        this.status = status;
    }
}
exports.Proposal = Proposal;
