import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import LogTable from './components/LogTable';
import { fetchLogs } from './services/api';
import './App.css';

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

const App = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    message: '',
    level: '',
    resourceId: '',
    timestamp_start: '',
    timestamp_end: ''
  });

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchLogs(filters).then(data => {
        setLogs(Array.isArray(data) ? data : []);
      }).catch(err => {
        console.error('Fetch error:', err);
        setLogs([]);
      });
    }, 300);
    return () => clearTimeout(debounce);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Log Query Interface</h1>
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        <LogTable logs={logs} />
      </div>
    </ErrorBoundary>
  );
};

export default App;