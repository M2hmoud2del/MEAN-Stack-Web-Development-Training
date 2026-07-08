import { JobStatus } from '../enums/JobStatus';

export class Proposal {
    constructor(
        public readonly id: string,
        public readonly projectId: string,
        public readonly freelancerId: string,
        public readonly coverLetter: string,
        public readonly proposedRate: number,
        public readonly proposedTimeline: number,
        public readonly createdAt: Date = new Date(),
        public readonly status: JobStatus = JobStatus.Review,
    ) {}
}