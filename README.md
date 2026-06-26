## 📸 Project Screenshot

![Saffrona Project Screenshot](./src/assets/projectImage.png)

---


# Saffrona Backend

This is the backend repository for the **Saffrona** application. It is built with Node.js, Express, and modern JavaScript practices to provide a secure, scalable, and robust API infrastructure.

---

## 🌐 Live Links

- **Frontend Live Site:** [https://saffrona.netlify.app/](https://saffrona.netlify.app/)

---

## 📁 Project Structure

```bash
saffrona-backend/
├── node_modules
├── src 
│     ├──assete/
│     ├── config/
│         ├──db.js          
│     ├── controllers/
│         ├──cartController.js
│         ├──foodController.js
│         ├──ordercontroller.js
│         ├──usercontroller.js
│     ├── models/
│         ├──foodModel.js
│         ├──orderModel.js
│         ├──userModel.js
│     ├── routes/          
│         ├──cartRoute.js
│         ├──orderRoute.js
│         ├──foodRoute.js
│         ├──userRoute.js
│     ├── middleware/        
│         ├──auth.js
│     └── uploads/
├── .env                    
├── .gitignore   
├── package.json
└── server.js