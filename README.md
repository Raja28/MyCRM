# 📊 MyCRM – Lead Management System

MyCRM is a robust, scalable CRM platform for managing sales leads, tracking their lifecycle, and empowering sales agents with actionable data. It features a complete lead tracking workflow, comment-based updates, visual reporting, and URL-based filtering — built with **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**.

---

## Demo Link
Visit website: [MyCRM](https://my-crm-client.vercel.app/)

## Demo Video
Watch video (4 mins): [Loom](https://www.loom.com/share/c8e1c83cbdf9466da52513c040b6f181?sid=b0590edb-a1e8-4379-937a-f7c92fc9d88a) 

---

## 🚀 Features

### 🧾 Lead Management

- Add and manage sales leads with detailed attributes
- Comment on leads to track updates and interactions.
- Reassign sales agents or change lead status dynamically.

### 🔍 Filtering & Views

- **LeadList View** with filters:
  - Sales Agent, Lead Status, Tags, Lead Source
  - Supports URL-based filtering

- **LeadStatusView** – Group leads by status.
- **SalesAgentView** – Group leads by agent, highlighting performance and workload.
- **LeadDetails** – In-depth lead view with history, comments, and update form.
- **Reports & Visualization** – Leads closed, Leads per sales agent, Pipeline by status

---

## 📡 API Endpoints (Express + MongoDB)

### Leads

- `POST /add-leads` – Create a lead   
- `PATCH /update-lead` – Update lead details  
- `DELETE /leads/:id` – Delete a lead  

### Sales Agents

- `POST /add-agents` – Add a new sales agent  
- `GET /agents` – Fetch all agents  

### Comments

- `POST /leads/add-comment` – Add comment to a lead  
- `GET /leads/get-comments` – Fetch lead comments  

### Tags

- `POST /add-tag` – Create a tag   

---

## 🧰 Tech Stack

| Layer         | Technology                               |
|---------------|-------------------------------------------|
| Frontend      | React, Redux Toolkit, React Router        |
| Backend       | Node.js, Express.js                       |
| Database      | MongoDB with Mongoose ODM                 |
| Charts        | Chart.js                                  |
| State Manager | Redux Toolkit (`@reduxjs/toolkit`)        |
| API Calls     | Axios                                     |
| Auth          | JWT, Bcrypt                               |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Raja28/MyCRM.git
npm i concurrently
npm install
cd run dev
