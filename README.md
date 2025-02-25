# Location Management API

This is a **NestJS** application that provides a RESTful API for managing hierarchical locations.

## **Features**
✅ CRUD operations for locations
✅ Hierarchical parent-child relationships
✅ PostgreSQL database with TypeORM
✅ Swagger API documentation (`/api`)
✅ Validation & Error Handling
✅ Dockerized PostgreSQL setup

---

## **1. Setup Instructions**
### **1.1 Install Dependencies**
```sh
npm install
```

### **1.2 Environment Variables**
Create a `.env` file in the root directory:
```ini
DB_HOST=localhost
DB_PORT=5432
DB_USER=nestjs_user
DB_PASSWORD=nestjs_password
DB_NAME=nestjs_db
```

---

## **2. Running the Application**
### **2.1 Running with PostgreSQL in Docker**
```sh
docker-compose up --build -d
```

### **2.2 Start the NestJS API**
```sh
npm run start:dev
```

### **2.3 Open API Documentation**
Swagger UI available at:  
🔗 **[http://localhost:3000/api](http://localhost:3000/api)**

---

## **3. API Endpoints**
### **3.1 Create a Location**
**Request:**
```sh
curl -X POST http://localhost:3000/locations \
     -H "Content-Type: application/json" \
     -d '{
           "building": "A",
           "name": "Lobby Level 1",
           "locationNumber": "A-01-Lobby",
           "area": 80.620
         }'
```
**Response:**
```json
{
  "id": 1,
  "building": "A",
  "name": "Lobby Level 1",
  "locationNumber": "A-01-Lobby",
  "area": 80.62,
  "parent": null
}
```

### **3.2 Retrieve All Locations**
```sh
curl -X GET http://localhost:3000/locations
```

### **3.3 Retrieve a Specific Location**
```sh
curl -X GET http://localhost:3000/locations/1
```

### **3.4 Update a Location**
```sh
curl -X PUT http://localhost:3000/locations/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Updated Lobby",
           "area": 85.0
         }'
```

### **3.5 Delete a Location**
```sh
curl -X DELETE http://localhost:3000/locations/1
```

---

## **4. Database Schema**
The `locations` table structure:
```sql
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    building VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    location_number VARCHAR(255) UNIQUE NOT NULL,
    area FLOAT NOT NULL,
    parent_id INT REFERENCES locations(id) ON DELETE SET NULL
);
```

---

## **5. License**
This project is licensed under the **MIT License**.

