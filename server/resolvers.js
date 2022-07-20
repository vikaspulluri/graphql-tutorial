import { Company, Job } from "./db.js";

function rejectIf(condition) {
  if (condition) throw new Error('Unauthorized');
}

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
    job: (root, args) => Job.findById(args.id),
    company: (root, { id }) => Company.findById(id),
    companies: () => Company.findAll()
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      console.log({user})
      if (!user) throw new Error('Unauthorized')
      return Job.create({ ...input, companyId: user.companyId })
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(input.id);
      rejectIf(job.companyId !== user.companyId);
      return Job.update({...input, companyId: user.companyId })
    },
    deleteJob: (_root, { id }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(id);
      rejectIf(job.companyId !== user.companyId);
      return Job.delete(id);
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id)
  },

  Job: {
    company: (job) => Company.findById(job.companyId)
  }
}