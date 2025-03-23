# DropBox Clone

Video Demo: [Google Drive link](https://drive.google.com/file/d/1Qhx_xQc7-AVPniSC6IQRntS5TXSbLS_o/view?usp=sharing)

A simple cloud storage web application built with React and React Router. Users can browse and view files, with a clean and responsive UI.

## Features
- File browsing with a modern UI
- View files in a detailed view
- Navigation bar with links to the developer's portfolio
- Responsive design for various screen sizes

## Tech Stack
- **React** – Frontend framework
- **Express, Node, Mongoose** - Backend
- **Tailwind CSS** – For styling

## Installation and Running on local 

**Please note that the images already visible on the dropbox(if any) might not be visible/downloadable since local storage was used and the path link might be different in mongodb database. Please upload images from your device to view the functionality properly. This can be used if any Database like S3 is used and we can replace S3 link in mongodb**

1. Clone the repository:

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   node server/index.js
   npm run dev
   ```

## Project Structure
```
.
├── src
│   ├── components
│   │   ├── FileList.tsx  # Displays the list of files
│   │   ├── FileView.tsx  # Detailed file view
│   ├── App.tsx           # Main application file
│   ├── index.tsx         # Entry point
│
├── public                # Static assets
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Deployment
To deploy the app, you can use platforms like Vercel or Netlify:
```sh
npm run build
```
Then, upload the `build/` folder to your preferred hosting service.

## License
This project is open-source and available under the MIT License.

---

### Built by Rushil
Find me on:
- [LinkedIn](https://www.linkedin.com/in/rushil-shah2501)
- [Portfolio](https://rushil2501.github.io/Rushil-Portfolio)

