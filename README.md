# Udyam Registration

A multi-step web application to register using Aadhaar and PAN verification with OTP and address autofill.

---

## Overview

This project helps users register by verifying their Aadhaar number with OTP and entering PAN details along with address info. The PIN code auto-fills city and state from a public API. User data is saved on the backend.

---

## Technologies Used

- Frontend: React (Next.js) with TypeScript and Tailwind CSS  
- Backend: Node.js with Express.js  
- Postal PIN API for city/state autofill  
- Deployment: Backend on Render, Frontend on Vercel  

---

## Features

- Aadhaar OTP generation and verification (mocked)  
- PAN validation using regex  
- PIN code lookup to auto-fill city and state  
- Responsive multi-step form with progress bar  
- Data saved in backend JSON file  

---

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed  
- Git installed  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SheetalShah12/udyam-registration.git
