# Open Soul - Anonymous Confession Board

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AWS](https://img.shields.io/badge/AWS-Elastic_Beanstalk_%26_S3-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)](https://aws.amazon.com/)

[cite_start]**Open Soul** is a secure, anonymous confession platform built to provide students with a safe digital space to share their thoughts, feelings, and experiences without revealing their identity[cite: 316, 321]. [cite_start]Developed using the MERN stack, it features a real-time post and comment system, role-based access for students and administrators, and a focus on community safety through content moderation[cite: 317, 318].

[cite_start]**Live Demo URL:** **[https://dtec4q6273imy.cloudfront.net/z](https://dtec4q6273imy.cloudfront.net/z)** [cite: 532]

<p align="center">
  <img src=".github/assets/Screenshot 2025-03-31 at 13.42.17.jpg" alt="Open Soul Landing Page" width="90%">
</p>

---
## ✨ Key Features

### **Anonymous Confessions & Interactions**
[cite_start]Students can post confessions with a title, description, and an optional image within various discussion groups[cite: 338]. [cite_start]They can also interact with posts through reactions and comments, fostering a supportive community[cite: 339, 365, 366]. [cite_start]To maintain safety, students can also delete their own confessions[cite: 361].

<p align="center">
  <img src=".github/assets/Screenshot 2025-03-31 at 13.43.11.jpg" alt="Confession Feed" width="80%">
</p>

### **Role-Based Access Control**
[cite_start]The platform features distinct login interfaces and dashboards for students and administrators to ensure secure, role-specific access[cite: 331].
* [cite_start]**Students** log in with their student ID and can browse groups, post, and interact[cite: 332, 333].
* [cite_start]**Admins** have elevated privileges to manage the platform's content and users[cite: 341].

<p align="center">
  <img src=".github/assets/Screenshot 2025-03-31 at 14.35.30.jpg" alt="Student Sign-in" width="80%">
</p>

### **Comprehensive Admin Management**
Administrators have a powerful dashboard to ensure the platform remains a safe space.
* [cite_start]**Group Management**: Admins can create, edit, and delete discussion groups[cite: 368, 370, 376, 378].
* [cite_start]**Student Management**: Admins can add, edit, and delete student accounts[cite: 381, 383, 387, 389].
* [cite_start]**Content Moderation**: A centralized dashboard allows admins to view and manage all confessions, students, and groups[cite: 391, 392, 393].

<p align="center">
  <img src=".github/assets/Screenshot 2025-03-31 at 14.45.55.jpg" alt="Admin Group Management Dashboard" width="80%">
</p>

---
## 🏗️ Architecture & Tech Stack

Open Soul is a full-stack MERN application deployed on AWS for scalability and performance.

| Category      | Technology / Service | Purpose |
| :------------ | :--- | :--- |
| **Frontend** | `React.js` | [cite_start]For building a dynamic and responsive user interface[cite: 499]. |
| **Backend** | `Node.js`, `Express.js` | [cite_start]To build the RESTful API for handling server-side logic[cite: 492, 493, 502]. |
| **Database** | `MongoDB` | [cite_start]NoSQL database for flexible storage of confessions, users, and groups[cite: 496]. |
| **Authentication**| `JSON Web Tokens (JWT)` | [cite_start]To secure user sessions and protect routes[cite: 506]. |
| **Backend Hosting**| `AWS Elastic Beanstalk`| [cite_start]For automated deployment, scaling, and management of the backend application[cite: 412]. |
| **Frontend Hosting**| `AWS S3` | [cite_start]To host the static React web application[cite: 423]. |
| **Image Storage**| `AWS S3` | [cite_start]For durable and scalable storage of user-uploaded images[cite: 418]. |
| **CDN** | `AWS CloudFront` | [cite_start]To accelerate content delivery and reduce latency for users worldwide[cite: 427]. |

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
[cite_start]This project was developed as a requirement for the **Cloud Platform Programming** module in the **MSc in Cloud Computing** program at the National College of Ireland[cite: 271, 313].
