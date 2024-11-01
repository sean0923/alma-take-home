# Alma Take Home Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
---
<img
  src="https://github.com/user-attachments/assets/e0ce91da-dd05-44d5-b56f-2de1a9270ea6"
  alt="image"
/>
---

## Data and file
Leads data is stored in firebase. Data access is controlled by firebase rule below.
<img width="547" alt="image" src="https://github.com/user-attachments/assets/68b9e683-6241-4827-a5ae-2b4b657200fd">

It is higly not likely but since `leads` creation is publically available, someone could abuse it. Since this project is a free tier project, Firebase should prevent extreme use cases.

Uploaded resume files are stored in `/public/uploaded-resumes` and I made `uploaded-resumes` folder as .gitignore


## Getting Started

First, run the development server:

If you have pnpm installed then
```bash
pnpm install && pnpm run dev
```

otherwise
```bash
npm install && pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to navigate

- `/`: public form page
- `/thank-you`: once form is submitted then user will be moved to this page
- `/login`: need to manually type [http://localhost:3000/login](http://localhost:3000/login) to move to this page. Login credential is provided in betweeen ()
- `/admin`: once successfully logged in then user will be redirected to this page
  - able to filter by status using firebase backend
  - able to do fuzzy search full name in client side using fuse.js


## Tech Requirements

- [X] Use Next.js to implement the application.
- [X] Mock the API endpoints if necessary (Bonus: implement API routes using Next.js API). <-- Used server action for uploading the pdf file
- [X] Implement a mock authentication mechanism to protect the internal leads list UI. <-- Implement actual authentication with firebase
- [X] Implement file upload for the resume/CV. <-- uploaded to /public/uploaded-resumes
- [X] Implement form validation to ensure all required fields are filled in correctly. <-- Used zod schema 
- [X] Style the application using CSS or a CSS-in-JS library (e.g., styled-components). <-- Used tailwind-css and Mantine UI library to style
- [X] The submission should match as close as possible to the mocks. <-- Tried to match mock

## **Bonus Points**

- [X] Implement API routes using Next.js API <-- Used server action instead
- [ ] Use [JsonForms](https://jsonforms.io/) to implement the lead form in a configuration driven way (JsonForms is a configuration driven UI component lib) <-- Did not have time
- [ ] Use a state management library (e.g., Redux) to manage the state of the leads. <-- Did not feel like state management was needed for small size app
- [ ] Implement unit tests for key components and functionalities. <-- No time
- [X] Add responsiveness to ensure the application works well on different screen sizes. <-- Add minimum responsive design for public page
- [X] Use TypeScript for type safety. <-- Yes
- [X] Implement form validation feedback (e.g., show error messages when fields are not filled in correctly). <-- Yes
- [ ] Document the system design. <-- Did not have time

## Why/How I made design choices


> Used firebase

Firebase has nice out of the box feature real-time listener and authentication help

> Zod schema

Zod is a nice tool to check schema of the form when submission happens. Also by using zod I could infer type from zod schema.

> Mantain UI & Tailwind CSS

Fastest way to make it look good

## Screenshots


### Thank You Page
<img width="528" alt="image" src="https://github.com/user-attachments/assets/49ffc4b2-73ca-4965-96ae-2ed9f253856c">

### Login Page
<img width="674" alt="image" src="https://github.com/user-attachments/assets/4e14fcbc-e899-46cf-bc81-8b3ce91d9a73">

### Admin Page
<img width="718" alt="image" src="https://github.com/user-attachments/assets/b14adf9e-5985-42bc-b701-f2f803c4c168">

### Admin Able to Logout
<img width="684" alt="image" src="https://github.com/user-attachments/assets/6a9a9848-bc69-41e3-a074-3199d5abcbf4">

### Main Page
![screencapture-localhost-3000-2024-10-31-20_14_24](https://github.com/user-attachments/assets/87bb8a0f-ee2e-4073-8a67-777867637ef5)
