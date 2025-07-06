import React from 'react';

const LogRow = ({ log }) => {
  // Skip rendering if log is undefined, null, or lacks required fields
  if (!log || typeof log !== 'object' || !log.level) {
    console.warn('Invalid log entry:', log);
    return null;
  }

  return (
    <tr className={`log-row ${log.level || ''}`}>
      <td>{log.level || ''}</td>
      <td>{log.message || ''}</td>
      <td>{log.resourceId || ''}</td>
      <td>{log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}</td>
      <td>{log.traceId || ''}</td>
      <td>{log.spanId || ''}</td>
      <td>{log.commit || ''}</td>
      <td>{log.metadata ? JSON.stringify(log.metadata) : ''}</td>
    </tr>
  );
};

export default LogRow;