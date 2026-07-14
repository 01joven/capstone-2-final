import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MemorialCard from '../components/MemorialCard';
import { memorialAPI, favoriteAPI } from '../services/api';
import './Search.css';

const Search = () => {
  const [memorials, setMemorials] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [savedIds, setSavedIds] = useState([]);

  const fetchMemorials = () => {
    memorialAPI.getAll({ search, category }).then(({ data }) => setMemorials(data));
  };

  useEffect(() => {
    fetchMemorials();
    favoriteAPI.getAll().then(({ data }) => setSavedIds(data.map((s) => s.id)));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMemorials();
  };

  const handleSave = async (memorialId) => {
    try {
      await favoriteAPI.add(memorialId);
      setSavedIds([...savedIds, memorialId]);
    } catch {
      // already saved
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">Search Memorials</h1>

        <form className="search-bar card" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Garden">Garden</option>
            <option value="Historic">Historic</option>
            <option value="Cemetery">Cemetery</option>
            <option value="Riverside">Riverside</option>
          </select>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="grid-3">
          {memorials.map((m) => (
            <MemorialCard
              key={m.id}
              memorial={m}
              onSave={handleSave}
              isSaved={savedIds.includes(m.id)}
            />
          ))}
        </div>

        {memorials.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: 40 }}>
            No memorials found. Try a different search.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Search;
