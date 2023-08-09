# Image Search App

This is a simple React + Vite application that allows users to search for images using the Unsplash API and display the results in a grid. Users can also filter images by predefined categories and navigate through the pages of search results.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Note](#Note)

## Features

- Search for images based on a query.
- Filter images by predefined categories.
- Pagination for navigating through search results.
- Responsive design for various screen sizes.
- Error handling for failed image fetch requests.

## Installation

1. Clone the repository:
git clone https://github.com/your-username/image-search-app.git

2. Navigate to the project directory:
cd image-search-app

3. Install the dependencies:
npm install

4. Obtain an Unsplash API access key by signing up on the Unsplash Developer Portal.

5. Create a .env.local file in the root directory and add your Unsplash API access key:
VITE_API_KEY=your-api-key

6. Start the development server:
npm run dev

7. Open your browser and go to http://localhost:5173 to view the app.
5173 is the port that I used. You can use the port shown at your terminal after you type the command npm run dev.

## Usage
Enter a search query in the input field and press Enter or click the search button.
Click on the predefined category buttons to filter images by category.
Use the "Previous" and "Next" buttons to navigate through the pages of search results.
Hover over images to see a subtle animation.

## Contributing
Contributions are welcome! If you find a bug or have a suggestion for improvements, feel free to open an issue or create a pull request.

- Fork the repository.
- Create a new branch: git checkout -b feature/your-feature-name.
- Make your changes and commit them: git commit -m 'Add some feature'.
- Push to the branch: git push origin feature/your-feature-name.
- Create a pull request describing your changes.

## License
This project is licensed under the MIT License.

## Note:
- Please make sure to replace placeholders like `your-username`, `your-api-key`, and adjust the content as needed to accurately represent your project.
