"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformManager = void 0;
const JobStatus_1 = require("../enums/JobStatus");
class PlatformManager {
    freelancers = [];
    clients = [];
    projects = [];
    proposals = [];
    static totalPlatformRevenue = 0;
    addFreelancer(freelancer) {
        this.freelancers.push(freelancer);
    }
    addClient(client) {
        if (client.budget < 0) {
            throw new Error('Client budget cannot be negative.');
        }
        this.clients.push(client);
    }
    addProject(project) {
        const clientExists = this.clients.some((client) => client.id === project.clientId);
        if (!clientExists) {
            throw new Error('Client must exist before adding a project.');
        }
        this.projects.push(project);
    }
    submitProposal(proposal) {
        const freelancerExists = this.freelancers.some((freelancer) => freelancer.id === proposal.freelancerId);
        const projectExists = this.projects.some((project) => project.id === proposal.projectId);
        if (!freelancerExists) {
            throw new Error('Freelancer must exist before submitting a proposal.');
        }
        if (!projectExists) {
            throw new Error('Project must exist before submitting a proposal.');
        }
        this.proposals.push(proposal);
    }
    assignProjectToFreelancer(projectId, freelancerId) {
        const project = this.findProjectById(projectId);
        const freelancerExists = this.freelancers.some((freelancer) => freelancer.id === freelancerId);
        if (!freelancerExists) {
            throw new Error('Freelancer does not exist.');
        }
        project.assignedFreelancerId = freelancerId;
        project.status = JobStatus_1.JobStatus.InProgress;
    }
    completeProject(projectId) {
        const project = this.findProjectById(projectId);
        if (project.status !== JobStatus_1.JobStatus.InProgress) {
            throw new Error('Only projects in progress can be completed.');
        }
        PlatformManager.totalPlatformRevenue += project.budget * 0.1;
        project.status = JobStatus_1.JobStatus.Completed;
    }
    getFreelancers() {
        return this.freelancers;
    }
    getClients() {
        return this.clients;
    }
    getProjects() {
        return this.projects;
    }
    getProposals() {
        return this.proposals;
    }
    findProjectById(projectId) {
        const project = this.projects.find((currentProject) => currentProject.id === projectId);
        if (!project) {
            throw new Error('Project not found.');
        }
        return project;
    }
}
exports.PlatformManager = PlatformManager;
