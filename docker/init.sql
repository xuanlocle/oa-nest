-- Create the locations table if not exists
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location_number VARCHAR(255) UNIQUE NOT NULL,
    area FLOAT NOT NULL,
    parent_id INT REFERENCES locations(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS locations_closure (
    id_ancestor INT NOT NULL,
    id_descendant INT NOT NULL,
    PRIMARY KEY (id_ancestor, id_descendant),
    FOREIGN KEY (id_ancestor) REFERENCES locations(id) ON DELETE CASCADE,
    FOREIGN KEY (id_descendant) REFERENCES locations(id) ON DELETE CASCADE
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
('Lobby Level 1', 'A-01-Lobby', 80.620, 4),
('Master Room', 'A-01-01', 50.110, 4),
('Meeting Room 1', 'A-01-01-M1', 20.110, 6),
('Corridor Level 1', 'A-01-Corridor', 30.200, 4),
('Toilet Level 1', 'A-01-02', 30.200, 4);

-- Insert Level 5 for Building B
INSERT INTO locations (name, location_number, area, parent_id) VALUES
('Level 5', 'B-05', 150.000, 2);

-- Insert Sub-Locations for Level 5 (Building B)
INSERT INTO locations (name, location_number, area, parent_id) VALUES
('Utility Room', 'B-05-11', 10.200, 10),
('Sanitary Room', 'B-05-12', 12.200, 10),
('Male Toilet', 'B-05-13', 30.200, 10),
('Genset Room', 'B-05-14', 35.200, 10),
('Pantry Level 5', 'B-05-15', 50.200, 10),
('Corridor Level 5', 'B-05-Corridor', 30.000, 10);

INSERT INTO locations_closure (id_ancestor, id_descendant) VALUES
(1, 3),
(1, 4),
(4, 5),
(1, 5),
(4, 6),
(1, 6),
(6, 7),
(4, 7),
(4, 8),
(1, 8),
(4, 9),
(1, 9),
(2, 10),
(10, 11),
(2, 11),
(10, 12),
(2, 12),
(10, 13),
(2, 13),
(10, 14),
(2, 14),
(10, 15),
(2, 15),
(10, 16),
(2, 16);
