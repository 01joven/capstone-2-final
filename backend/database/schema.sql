-- Run this SQL in your Neon PostgreSQL console to create tables

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_image_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS memorials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  price DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  memorial_id INTEGER REFERENCES memorials(id) ON DELETE CASCADE,
  visitor_name VARCHAR(100) NOT NULL,
  contact VARCHAR(100) NOT NULL,
  reservation_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  memorial_id INTEGER REFERENCES memorials(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, memorial_id)
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample memorial data
INSERT INTO memorials (name, description, latitude, longitude, category, image_url, price) VALUES
  ('Peaceful Gardens Memorial', 'A serene memorial park with beautiful landscaping.', 14.5995, 120.9842, 'Garden', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400', 500.00),
  ('Heritage Memorial Park', 'Historic memorial site preserving local heritage.', 14.5547, 121.0244, 'Historic', 'https://images.unsplash.com/photo-1519167758481-83f29da8c2d5?w=400', 750.00),
  ('Sunset Hills Cemetery', 'Peaceful hillside memorial with panoramic views.', 14.6760, 121.0437, 'Cemetery', 'https://images.unsplash.com/photo-1464226184884-fa280b87c0d8?w=400', 600.00),
  ('Riverside Memorial', 'Memorial along the riverside with tranquil atmosphere.', 14.6507, 121.0494, 'Riverside', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400', 450.00);
