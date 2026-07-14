import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MemorialCard from '../components/MemorialCard';
import { favoriteAPI } from '../services/api';

const Saved = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    favoriteAPI.getAll().then(({ data }) => setSaved(data));
  }, []);

  const handleRemove = async (memorialId) => {
    const item = saved.find((s) => s.id === memorialId);
    if (item) {
      await favoriteAPI.remove(item.saved_id);
      setSaved(saved.filter((s) => s.id !== memorialId));
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">Saved Memorials</h1>

        {saved.length === 0 ? (
          <p style={{ color: 'var(--text-light)', textAlign: 'center', marginTop: 40 }}>
            No saved memorials yet. Browse and save your favorites!
          </p>
        ) : (
          <div className="grid-3">
            {saved.map((m) => (
              <MemorialCard
                key={m.id}
                memorial={m}
                onSave={handleRemove}
                isSaved={true}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Saved;
