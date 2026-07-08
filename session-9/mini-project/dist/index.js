"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterEngine = exports.PlatformManager = exports.Proposal = exports.JobStatus = void 0;
var JobStatus_1 = require("./enums/JobStatus");
Object.defineProperty(exports, "JobStatus", { enumerable: true, get: function () { return JobStatus_1.JobStatus; } });
var Proposal_1 = require("./classes/Proposal");
Object.defineProperty(exports, "Proposal", { enumerable: true, get: function () { return Proposal_1.Proposal; } });
var PlatformManager_1 = require("./classes/PlatformManager");
Object.defineProperty(exports, "PlatformManager", { enumerable: true, get: function () { return PlatformManager_1.PlatformManager; } });
var FilterEngine_1 = require("./classes/FilterEngine");
Object.defineProperty(exports, "FilterEngine", { enumerable: true, get: function () { return FilterEngine_1.FilterEngine; } });
const JobStatus_2 = require("./enums/JobStatus");
const FilterEngine_2 = require("./classes/FilterEngine");
const PlatformManager_2 = require("./classes/PlatformManager");
const Proposal_2 = require("./classes/Proposal");
function runCliDemo() {
    const platform = new PlatformManager_2.PlatformManager();
    const freelancer = {
        id: 'freelancer-1',
        name: 'Mona Khaled',
        email: 'mona@example.com',
        skills: ['TypeScript', 'React'],
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
        skillsRequired: ['TypeScript', 'React'],
        budget: 3000,
        status: JobStatus_2.JobStatus.Open,
        clientId: client.id,
    };
    const proposal = new Proposal_2.Proposal('proposal-1', project.id, freelancer.id, 'I can deliver this in 10 days with a strong component structure and clean UX.', 42, 10);
    platform.addFreelancer(freelancer);
    platform.addClient(client);
    platform.addProject(project);
    platform.submitProposal(proposal);
    platform.assignProjectToFreelancer(project.id, freelancer.id);
    platform.completeProject(project.id);
    const filterEngine = new FilterEngine_2.FilterEngine();
    const matchedFreelancers = filterEngine.filterByProperty([freelancer], 'hourlyRate', 45);
    console.log('GigLance CLI Demo');
    console.log('------------------');
    console.log(`Freelancers: ${platform.getFreelancers().length}`);
    console.log(`Clients: ${platform.getClients().length}`);
    console.log(`Projects: ${platform.getProjects().length}`);
    console.log(`Proposals: ${platform.getProposals().length}`);
    console.log(`Project status: ${platform.getProjects()[0]?.status}`);
    console.log(`Platform revenue: ${PlatformManager_2.PlatformManager.totalPlatformRevenue.toFixed(2)}`);
    console.log(`Filtered freelancers: ${matchedFreelancers.length}`);
}
if (process.argv[1]?.endsWith('index.js')) {
    runCliDemo();
}
