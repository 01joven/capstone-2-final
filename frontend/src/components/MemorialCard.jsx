import { Link } from 'react-router-dom';
import './MemorialCard.css';

const MemorialCard = ({ memorial, onSave, isSaved }) => {
  return (
    <div className="memorial-card card">
      <img
        src={memorial.image_url || 'https://via.placeholder.com/400x200?text=Memorial'}
        alt={memorial.name}
        className="memorial-card-img"
      />
      <div className="memorial-card-body">
        <span className="memorial-category">{memorial.category}</span>
        <h3>{memorial.name}</h3>
        <p>{memorial.description?.substring(0, 80)}...</p>
        <div className="memorial-card-footer">
          <span className="memorial-price">₱{parseFloat(memorial.price).toLocaleString()}</span>
          <div className="memorial-card-actions">
            {onSave && (
              <button
                className={`save-btn ${isSaved ? 'saved' : ''}`}
                onClick={() => onSave(memorial.id)}
              >
                {isSaved ? '❤️' : '🤍'}
              </button>
            )}
            <Link to={`/reservations/${memorial.id}`} className="btn btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemorialCard;
