-- Create the locations table if not exists
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location_number VARCHAR(255) UNIQUE NOT NULL,
    area FLOAT NOT NULL,
    parent_id INT REFERENCES locations(id) ON DELETE SET NULL
);

-- Insert sample data
-- Insert Buildings
INSERT INTO locations (name, location_number, area, parent_id) VALUES
('Building A', 'A', 0, NULL),
('Building B', 'B', 0, NULL);

-- Insert Level 1 Locations for Building A
INSERT INTO locations (name, location_number, area, parent_id) VALUES
('Car Park', 'A-CarPark', 80.620, 1),
('Level 1', 'A-01', 100.920, 1);

-- Insert Sub-Locations for Level 1 (Building A)
INSERT INTO locations (name, location_number, area, parent_id) VALUES
('Lobby Level 1', 'A-01-Lobby', 80.620, 3),
('Master Room', 'A-01-01', 50.110, 3),
('Meeting Room 1', 'A-01-01-M1', 20.110, 5),
('Corridor Level 1', 'A-01-Corridor', 30.200, 3),
('Toilet Level 1', 'A-01-02', 30.200, 3);

-- Insert Level 5 for Building B
INSERT INTO locations (name, location_number, area, parent_id) VALUES
('Level 5', 'B-05', 150.000, 2);

-- Insert Sub-Locations for Level 5 (Building B)
INSERT INTO locations (name, location_number, area, parent_id) VALUES
('Utility Room', 'B-05-11', 10.200, 9),
('Sanitary Room', 'B-05-12', 12.200, 9),
('Male Toilet', 'B-05-13', 30.200, 9),
('Genset Room', 'B-05-14', 35.200, 9),
('Pantry Level 5', 'B-05-15', 50.200, 9),
('Corridor Level 5', 'B-05-Corridor', 30.000, 9);
