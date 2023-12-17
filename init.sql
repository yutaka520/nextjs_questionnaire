-- init.sql
CREATE TABLE survey_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  engineer_type VARCHAR(255) NOT NULL,
  favorite_language VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
