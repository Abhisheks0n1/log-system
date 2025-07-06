import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="message"
        placeholder="Search message..."
        value={filters.message}
        onChange={handleChange}
      />
      <select name="level" value={filters.level} onChange={handleChange}>
        <option value="">All Levels</option>
        <option value="error">Error</option>
        <option value="warn">Warning</option>
        <option value="info">Info</option>
        <option value="debug">Debug</option>
      </select>
      <input
        type="text"
        name="resourceId"
        placeholder="Resource ID"
        value={filters.resourceId}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="timestamp_start"
        value={filters.timestamp_start}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="timestamp_end"
        value={filters.timestamp_end}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterBar;