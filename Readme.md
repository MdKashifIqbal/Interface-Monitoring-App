# 📊 Interface Monitoring Dashboard

A full-stack MERN application for monitoring HR integrations between systems like **SAP SuccessFactors**, **SAP ECP**, and third-party platforms.  
The app tracks interface execution logs, success/failure rates, and provides detailed filtering, pagination, and a modern responsive dashboard UI.

---

## 🚀 Tech Stack

### **Backend**
- **Node.js** – JavaScript runtime
- **Express.js** – Web server framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT** – JSON Web Token authentication
- **bcryptjs** – Secure password hashing
- **dotenv** – Environment variables
- **cors** – Cross-Origin Resource Sharing support

### **Frontend**
- **React** –  library
- **Vite** – Fast build tool
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first styling
- **ShadCN/UI** – Modern, accessible UI components
- **Recharts** – Charts and graphs
- **Axios** – API requests

---

## 📌 Features

### **Backend**
- RESTful API with CRUD operations
- Secure authentication with JWT
- Role-Based Access Control (Admin & Viewer)
- Pagination, filtering, and sorting for logs
- Summary statistics API for dashboard
- Input validation with Mongoose
- Optimized for large datasets (500k+ records)

### **Frontend**
- Responsive, modern dashboard layout
- Live interface logs table with filters
- Charts for success/failure trends
- Auth pages: Login & Register
- Interface list and add new interface form
- Status badges with color coding
- Pagination and search functionality
- Dark/light theme ready (ShadCN)

---

<!-- ## 📂 Project Structure -->


---

## 🔗 Backend API Routes

### **User Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Authenticate & get token |

### **Interfaces Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/interfaces` | Get all interfaces |
| POST | `/api/interfaces` | Create a new interface |

### **Logs Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/logs` | Get all logs (supports pagination, filtering, sorting) |
| GET | `/api/logs/summary` | Summary stats for dashboard |
| POST | `/api/logs` | Add new log entry |

---

## 📊 Pagination & Filtering
- **Pagination**: Implemented in `/api/logs` for scalable performance.
- **Filtering**: By `status`, `interfaceId`, date ranges.
- **Sorting**: Customizable order (latest first, by status, etc.).

---

## ⚙️ Installation & Setup

### **1. Clone the repository**


```
git clone https://github.com/your-repo/interface-dashboard.git

cd interface-dashboard
```

***

### **2. Setup Backend**
```
cd backend
npm install
```
Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/api
JWT_SECRET=your_jwt_secret
```

```
Run backend: npm start
```


### **3. Setup Frontend**
```
cd cleint
cd interface-monitoring-frontend
npm install
npm run dev
```


---

## 📸 Screenshots 

![alt text](image.png)


![alt text](image-1.png)

---

## 🛡 Security
- Password hashing using bcrypt
- JWT authentication for API routes
- Role-based route protection

---

## 👨‍💻 Author
Developed by **Md. Kashif Iqbal**

---

---

## 📝 Future Enhancements
This project is under active development. In upcoming versions, I plan to add:

- **Enhanced Authentication**: Signup, Login, and Logout flows with better session handling.
- **Interface Management**: Create, update, and delete interfaces directly from the UI.
- **Log Management**: Add new logs via the frontend, with bulk import/export options.
- **UI/UX Improvements**: More theme customization, animations, and improved mobile responsiveness.
- **Additional Filters**: Advanced filtering for logs by date range, keywords, and interface type.
- **Real-time Updates**: Live log updates using WebSockets.
- **Security Improvements**: Stronger validation and role-based permissions.

Stay tuned for more features!


## 📜 License
MIT License

