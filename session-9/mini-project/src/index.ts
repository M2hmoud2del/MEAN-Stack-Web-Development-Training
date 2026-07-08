export { JobStatus } from './enums/JobStatus';
export type { Skill } from './types/Skill';
export type { IUser } from './interfaces/IUser';
export type { IFreelancer } from './interfaces/IFreelancer';
export type { IClient } from './interfaces/IClient';
export type { IProject } from './interfaces/IProject';
export { Proposal } from './classes/Proposal';
export { PlatformManager } from './classes/PlatformManager';
export { FilterEngine } from './classes/FilterEngine';

import { JobStatus } from './enums/JobStatus';
import { FilterEngine } from './classes/FilterEngine';
import { PlatformManager } from './classes/PlatformManager';
import { Proposal } from './classes/Proposal';
import type { Skill } from './types/Skill';

declare const process: { argv: string[] };

function runCliDemo(): void {
	const platform = new PlatformManager();

	const freelancer = {
		id: 'freelancer-1',
		name: 'Mona Khaled',
		email: 'mona@example.com',
		skills: ['TypeScript', 'React'] as Skill[],
		hourlyRate: 45,
	};

	const client = {
		id: 'client-1',
		name: 'Acme Studio',
		email: 'hello@acme.studio',
		budget: 5000,
	};

	const project = {
		id: 'project-1',
		title: 'Landing page rebuild',
		description: 'Build a modern landing page with responsive layout and reusable components.',
		skillsRequired: ['TypeScript', 'React'] as Skill[],
		budget: 3000,
		status: JobStatus.Open,
		clientId: client.id,
	};

	const proposal = new Proposal(
		'proposal-1',
		project.id,
		freelancer.id,
		'I can deliver this in 10 days with a strong component structure and clean UX.',
		42,
		10,
	);

	platform.addFreelancer(freelancer);
	platform.addClient(client);
	platform.addProject(project);
	platform.submitProposal(proposal);
	platform.assignProjectToFreelancer(project.id, freelancer.id);
	platform.completeProject(project.id);

	const filterEngine = new FilterEngine<typeof freelancer>();
	const matchedFreelancers = filterEngine.filterByProperty([freelancer], 'hourlyRate', 45);

	console.log('GigLance CLI Demo');
	console.log('------------------');
	console.log(`Freelancers: ${platform.getFreelancers().length}`);
	console.log(`Clients: ${platform.getClients().length}`);
	console.log(`Projects: ${platform.getProjects().length}`);
	console.log(`Proposals: ${platform.getProposals().length}`);
	console.log(`Project status: ${platform.getProjects()[0]?.status}`);
	console.log(`Platform revenue: ${PlatformManager.totalPlatformRevenue.toFixed(2)}`);
	console.log(`Filtered freelancers: ${matchedFreelancers.length}`);
}

if (process.argv[1]?.endsWith('index.js')) {
	runCliDemo();
}
