# 🚕 TripSync

TripSync is a **ride-sharing web application** inspired by Uber and DIDI.  It connects riders and drivers, making it easy to request, accept, and complete rides with transparent fare calculation and built-in safety features.

---

## 🔗 Live Deployment
👉 [TripSync Live Demo](<your-live-deployment-link>)

---

## 📖 Project Overview
## 📖 Project Overview
TripSync provides a simple and secure ride-sharing experience.  
Riders can request trips and also can cancel, drivers can accept them or reject, and driver can manage their ride history. The platform also includes an **SOS emergency button** to enhance safety during trips. It is fully **responsive**, ensuring a smooth user experience across **desktop, tablet, and mobile devices**.
 
---

## ✨ Features
### 👤 User (Rider)
- Secure sign up / log in  
- Manage account profile (update personal info, change password)
- OTP verification for account security
- Request a ride with pickup & destination  
- Automatic fare calculation (base fare + distance)  
- Current or last ride details
- View ride history  
- Use **SOS emergency feature**  
- Integrated payments
- Ride ratings & feedback system

### 🚗 Driver
- Apply to become a driver  
- Manage driver profile (update personal info, change password)
- OTP verification for secure driver account
- Change **availability status** (go offline/online anytime with a toggle) 
- Accept or reject ride requests  
- Start and complete rides  
- Manage **ride progress status** (e.g., not started, picked up, in transit, completed) 
- Use **SOS emergency feature**  
- View trip history and earnings  
- View feedback from riders

### 🛡️ Admin
- Manage users and drivers  
- Approve/reject driver applications  
- Monitor all rides on the platform  
- Review ratings & feedback
- Access **Analytics Dashboard**:  
  - Ride analytics (total rides, completed rides, canceled rides etc)  
  - Revenue statistics  
  - Driver activity and performance 

---

## 🛠️ Technology Stack
**Frontend**
- React + TypeScript  
- Tailwind CSS + ShadCN UI  
- React-Leaflet (for maps)  
- Lucide Icons  

**Backend**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- REST API architecture  

**Other Tools**
- Deployment: Vercel 
- Git & GitHub for version control  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash```
git clone <your-repo-link>
cd tripsync

### 2. Install dependencies
<pre><code>
npm install
npm run dev
</code></pre>

### 3. Configure environment variables
Create a .env file in the root:
<pre><code>
VITE_BASE_URL=<your-secret-key>
</code></pre>

### 4. Run the development server
<pre><code>
npm run dev
</code></pre>

### 5. Build for production
<pre><code>
npm run build
</code></pre>

## 📌 Future Improvements
- Real-time driver tracking on the map
- Multi-language support (English, Bengali, Chinese)
- AI
- Promo codes & referral rewards system

