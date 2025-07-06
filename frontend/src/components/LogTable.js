import React from 'react';
import LogRow from './LogRow';

const LogTable = ({ logs }) => (
  <table className="log-table">
    <thead>
      <tr>
        <th>Level</th>
        <th>Message</th>
        <th>Resource ID</th>
        <th>Timestamp</th>
        <th>Trace ID</th>
        <th>Span ID</th>
        <th>Commit</th>
        <th>Metadata</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(logs) ? (
        logs
          .filter(log => log && typeof log === 'object' && log.level)
          .map(log => <LogRow key={log.id} log={log} />)
      ) : (
        <tr><td colSpan="8">No logs available</td></tr>
      )}
    </tbody>
  </table>
);

export default LogTable;