import { JobStatus } from '../enums/JobStatus';
import type { IClient } from '../interfaces/IClient';
import type { IFreelancer } from '../interfaces/IFreelancer';
import type { IProject } from '../interfaces/IProject';
import { Proposal } from './Proposal';

export class PlatformManager {
	private freelancers: IFreelancer[] = [];
	private clients: IClient[] = [];
	private projects: IProject[] = [];
	private proposals: Proposal[] = [];

	static totalPlatformRevenue = 0;

	addFreelancer(freelancer: IFreelancer): void {
		this.freelancers.push(freelancer);
	}

	addClient(client: IClient): void {
		if (client.budget < 0) {
			throw new Error('Client budget cannot be negative.');
		}

		this.clients.push(client);
	}

	addProject(project: IProject): void {
		const clientExists = this.clients.some((client) => client.id === project.clientId);

		if (!clientExists) {
			throw new Error('Client must exist before adding a project.');
		}

		this.projects.push(project);
	}

	submitProposal(proposal: Proposal): void {
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

	assignProjectToFreelancer(projectId: string, freelancerId: string): void {
		const project = this.findProjectById(projectId);
		const freelancerExists = this.freelancers.some((freelancer) => freelancer.id === freelancerId);

		if (!freelancerExists) {
			throw new Error('Freelancer does not exist.');
		}

		project.assignedFreelancerId = freelancerId;
		project.status = JobStatus.InProgress;
	}

	completeProject(projectId: string): void {
		const project = this.findProjectById(projectId);

		if (project.status !== JobStatus.InProgress) {
			throw new Error('Only projects in progress can be completed.');
		}

		PlatformManager.totalPlatformRevenue += project.budget * 0.1;
		project.status = JobStatus.Completed;
	}

	getFreelancers(): readonly IFreelancer[] {
		return this.freelancers;
	}

	getClients(): readonly IClient[] {
		return this.clients;
	}

	getProjects(): readonly IProject[] {
		return this.projects;
	}

	getProposals(): readonly Proposal[] {
		return this.proposals;
	}

	private findProjectById(projectId: string): IProject {
		const project = this.projects.find((currentProject) => currentProject.id === projectId);

		if (!project) {
			throw new Error('Project not found.');
		}

		return project;
	}
}