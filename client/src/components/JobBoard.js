import { useEffect, useState } from 'react';
import { getJobs } from '../graphql/queries';
import JobList from './JobList';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs().then(jobs => setJobs(jobs))
  }, [])
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
