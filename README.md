# Open Soul - Anonymous Confession Board

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AWS](https://img.shields.io/badge/AWS-Elastic_Beanstalk_%26_S3-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)](https://aws.amazon.com/)

**Open Soul** is a full-stack MERN application designed to provide a secure and judgment-free space for students to share their thoughts and experiences anonymously. The project's core philosophy is to foster a supportive community by prioritizing user privacy and safety, managed through a robust, role-based system for content moderation.

**Live Demo URL:** **[https://dtec4q6273imy.cloudfront.net/z](https://dtec4q6273imy.cloudfront.net/z)**

---
## Project Vision & Core Functionality

[cite_start]Open Soul was built to address the need for a confidential outlet for self-expression within an academic setting[cite: 57]. [cite_start]It provides a platform where users can post confessions, engage in discussions, and react to posts without revealing their identities, creating a safe digital environment[cite: 47, 54].

### For Students:
* [cite_start]**Secure Login**: Authenticate using a unique Student ID to access the platform[cite: 63].
* [cite_start]**Group-Based Discussions**: Join and participate in various discussion groups like "General Campus," "Library Whispers," or "Canteen Talks." [cite: 64, 65, 66, 67, 68]
* [cite_start]**Anonymous Posting**: Share confessions with a title, a detailed description, and an optional image[cite: 69].
* [cite_start]**Post Control**: Retain the ability to delete your own confessions at any time, ensuring complete control over your shared content[cite: 92].
* [cite_start]**Community Interaction**: Engage with other posts through comments and reactions[cite: 70, 97].

### For Administrators:
* [cite_start]**Role-Based Access**: A separate, secure login for administrators grants access to platform management tools[cite: 62, 72].
* [cite_start]**Content & Community Management**: A comprehensive dashboard provides a centralized view of all confessions, students, and groups[cite: 123, 124].
* [cite_start]**Group Curation**: Full CRUD (Create, Read, Update, Delete) capabilities for managing all discussion groups[cite: 99, 101, 107, 109].
* [cite_start]**User Oversight**: The ability to add, edit, or remove student accounts as needed to maintain the user base[cite: 112, 114, 118, 120].

---
## Architectural Deep Dive

Open Soul is engineered as a scalable, cloud-native application on AWS, leveraging the MERN stack for a robust and modern architecture.

### **Backend - Deployed on AWS Elastic Beanstalk**
The backend is a Node.js and Express.js RESTful API that serves as the application's brain. [cite_start]It handles all business logic, including user authentication, confession processing, and database interactions[cite: 224].

* [cite_start]**Why Elastic Beanstalk?** This service was chosen to automate infrastructure management and ensure high availability[cite: 177]. [cite_start]It handles server provisioning, load balancing, and auto-scaling, allowing the application to dynamically respond to traffic spikes with minimal operational overhead[cite: 144, 146, 177].

### **Frontend - A Static React App on AWS S3 & CloudFront**
[cite_start]The user interface is a dynamic single-page application built with React.js[cite: 230].

* [cite_start]**Why S3 & CloudFront?** Hosting the frontend as a static site on AWS S3 provides a highly durable, available, and cost-effective solution[cite: 203, 204, 210]. This architecture is enhanced by AWS CloudFront, a global CDN that caches assets at edge locations. [cite_start]This dramatically reduces latency and improves load times for users anywhere in the world, while also providing a layer of security against DDoS attacks[cite: 158, 160, 194, 200].

### **Database - MongoDB**
[cite_start]MongoDB serves as the NoSQL database, chosen for its flexible, document-based data model[cite: 227, 228].

* [cite_start]**Why MongoDB?** Its schema-less nature is ideal for handling diverse user-generated content like confessions, comments, and user profiles, allowing for easy scalability and evolution of the data structure as the platform grows[cite: 228].

### **Asset Storage - Amazon S3**
[cite_start]User-uploaded images are stored in a dedicated Amazon S3 bucket, decoupled from the main application server[cite: 149].

* [cite_start]**Why S3 for Images?** S3 offers virtually unlimited scalability, extreme durability (99.999999999%), and cost-effectiveness for storing media files[cite: 181, 182, 183, 189]. [cite_start]The application uses presigned URLs to grant temporary, secure access for uploads and retrievals, protecting assets from unauthorized access while reducing the load on the backend server[cite: 152, 190].

### **Authentication - JSON Web Tokens (JWT)**
[cite_start]User sessions are secured using JWT[cite: 237]. [cite_start]Upon successful login, a token is generated and sent to the client, where it is stored and included in subsequent requests to access protected API routes, ensuring that only authenticated users can perform actions[cite: 237].

---
## 🔧 Getting Started Locally

1.  **Clone the Repository**: `git clone <your-repo-url>`
2.  **Install Dependencies**: Run `npm install` in both the `frontend` and `backend` directories.
3.  **Set Up Environment**: Create a `.env` file in the `backend` directory with your `MONGO_URI` and a `JWT_SECRET`.
4.  **Run the Backend**: From the `backend` directory, run `npm start`.
5.  **Run the Frontend**: From the `frontend` directory, run `npm start`. The app will be available at `http://localhost:3000`.

---
## Acknowledgments
[cite_start]This project was developed as a requirement for the **Cloud Platform Programming** module in the **MSc in Cloud Computing** program at the National College of Ireland[cite: 44].
