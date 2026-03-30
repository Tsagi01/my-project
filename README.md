# 357 Ltd Ordering Prototype

This project is a simple prototype for an online ordering system for **357 Ltd**.
The company provides learning resources for students studying **SQA Advanced Higher Computing** in central Scotland.

The prototype is built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

## Project Purpose

This prototype was created to demonstrate the early user flow for the ordering system before a full version is developed.

It currently focuses on:

- student account creation
- browsing hard-coded products
- adding products to a basket
- basic basket management
- a prototype payment page with no real payment processing

## Current Features

- A register-first flow:
  - users must create a student account before accessing the shopping pages
- A home page with:
  - a simple navbar
  - a hard-coded product catalogue
  - pagination
- Product categories relevant to the business:
  - books
  - CD/DVD resources
  - software
  - hardware
- Basket functionality:
  - add items
  - decrease or remove items
  - view quantity and totals
- A payment page:
  - lets the user choose a payment method
  - does **not** connect to any real payment provider

## Prototype Limitations

This project is intentionally simple and uses browser storage only.

- No database
- No advanced authentication
- No real payment integration
- No production-ready order processing yet

## Local Storage

The prototype uses `localStorage` in the browser to keep simple user data:

- saved student account
- basket contents

This makes the project easier to understand for beginner-level development.

## Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - start the production server
- `npm run lint` - run ESLint

## Main App Routes

- `/` - home page, shown after student registration
- `/register` - student account creation page
- `/basket` - basket page
- `/payment` - payment method prototype page

## Notes

- The payment page is **UI only**.
- Selecting a payment method does not trigger any real payment.
- The project is intended as a coursework prototype, not a finished commercial system.
