# Open Soul - Anonymous Confession Board

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AWS](https://img.shields.io/badge/AWS-Elastic_Beanstalk_%26_S3-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)](https://aws.amazon.com/)

**Open Soul** is a secure, anonymous confession platform built to provide students with a safe digital space to share their thoughts, feelings, and experiences without revealing their identity. Developed using the MERN stack, it features a real-time post and comment system, role-based access for students and administrators, and a focus on community safety through content moderation.

**Live Demo URL:** **[https://dtec4q6273imy.cloudfront.net/z](https://dtec4q6273imy.cloudfront.net/z)**

<p align="center">
  <img src=".github/assets/01-landing-page.png" alt="Open Soul Landing Page" width="90%">
</p>

---
## ✨ Key Features

### **Anonymous Confessions & Interactions**
Students can post confessions with a title, description, and an optional image within various discussion groups. They can also interact with posts through reactions and comments, fostering a supportive community. To maintain safety, students can also delete their own confessions.

<p align="center">
  <img src=".github/assets/02-confession-feed.png" alt="Confession Feed" width="80%">
</p>

### **Role-Based Access Control**
The platform features distinct login interfaces and dashboards for students and administrators to ensure secure, role-specific access.
* **Students** log in with their student ID and can browse groups, post, and interact.
* **Admins** have elevated privileges to manage the platform's content and users.

<p align="center">
  <img src=".github/assets/03-student-signin.png" alt="Student Sign-in" width="80%">
</p>

### **Comprehensive Admin Management**
Administrators have a powerful dashboard to ensure the platform remains a safe space.
* **Group Management**: Admins can create, edit, and delete discussion groups.
* **Student Management**: Admins can add, edit, and delete student accounts.
* **Content Moderation**: A centralized dashboard allows admins to view and manage all confessions, students, and groups.

<p align="center">
  <img src=".github/assets/04-admin-dashboard.png" alt="Admin Group Management Dashboard" width="80%">
</p>

---
## 🏗️ Architecture & Tech Stack

Open Soul is a full-stack MERN application deployed on AWS for scalability and performance.
| Category      | Technology / Service | Purpose |
| :------------ | :--- | :--- |
| **Frontend** | `React.js` | For building a dynamic and responsive user interface. |
| **Backend** | `Node.js`, `Express.js` | To build the RESTful API for handling server-side logic. |
| **Database** | `MongoDB` | NoSQL database for flexible storage of confessions, users, and groups. |
| **Authentication**| `JSON Web Tokens (JWT)` | To secure user sessions and protect routes. |
| **Backend Hosting**| `AWS Elastic Beanstalk`| For automated deployment, scaling, and management of the backend application. |
| **Frontend Hosting**| `AWS S3` | To host the static React web application. |
| **Image Storage**| `AWS S3` | For durable and scalable storage of user-uploaded images. |
| **CDN** | `AWS CloudFront` | To accelerate content delivery and reduce latency for users worldwide. |

---
## 🔧 Getting Started Locally

To set up and run this project on your local machine, follow these general steps:

1.  **Clone the Repository**
    ```sh
    git clone <your-repo-url>
    cd <your-repo-folder>
    ```
2.  **Install Dependencies**
    * Navigate to the `backend` folder and run `npm install`.
    * Navigate to the `frontend` folder and run `npm install`.

3.  **Set Up Environment Variables**
    * Create a `.env` file in the `backend` directory.
    * Add your MongoDB connection string and JWT secret key:
        ```env
        MONGO_URI="your_mongodb_connection_string"
        JWT_SECRET="your_jwt_secret"
        ```

4.  **Run the Application**
    * From the `backend` directory, start the server: `npm start`.
    * From the `frontend` directory, start the React app: `npm start`.
    * The application will be available at `http://localhost:3000`.

---
## Acknowledgments
This project was developed as a requirement for the **Cloud Platform Programming** module in the **MSc in Cloud Computing** program at the National College of Ireland.
