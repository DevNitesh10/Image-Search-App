import { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 36;


function App() {  
  // Ref to access the search input element
  const searchInput = useRef(null);

   // State variables
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Function to fetch images from the API
  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg('');
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setImages(data.results); // Update images state with fetched data
        setTotalPages(data.total_pages); // Update total pages based on API response
      }
    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
      console.log(error);
    }
  }, [page]);

  // Fetch images on component mount and whenever the fetchImages function changes
  useEffect(() =>  {
    fetchImages();
  }, [fetchImages]) ;  
  
  // Function to reset search and fetch new images
  const resetSearch = () => {
    setPage(1); // Reset page to 1
    fetchImages(); // Fetch new images based on the reset search
  }

   // Function to handle search form submission
  const handleSearch = (event) => {
    event.preventDefault(); // Prevents page reload on form submission
    resetSearch(); // Reset search and fetch new images
  };

   // Function to handle category selection
  const handleSelection = (selection) => {
    searchInput.current.value = selection; // Set search input value to the selected category
    resetSearch(); // Reset search and fetch new images based on the selected category
  };

  return (
    <div className='container'>
    <h1 className='title'>Image Search</h1>

    {/* Display error message if present */}
    {setErrorMsg && <p className='error-msg'>{errorMsg}</p>}

    {/* Search Section */}
    <div className="search-section">
      <Form onSubmit={handleSearch}>
      <Form.Control type="search"
       placeholder="Type Something to Search..."
       className='search-input'
       ref={searchInput} // Assign the search input element to the ref
        /> 
      </Form>
    </div>

     {/* Filters Section */}
    <div className="filters">
      <div onClick={() => handleSelection('nature')}>Nature</div>
      <div onClick={() => handleSelection('birds')}>Birds</div>
      <div onClick={() => handleSelection('cats')}>Cats</div>
      <div onClick={() => handleSelection('shoes')}>Shoes</div>
    </div>

    {/* Images Section */}
    <div className="images">
    {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className='image'
          />
        ))}
    </div>

     {/* Pagination Buttons */}
    <div className='buttons'>
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </div>
  </div>
  );
}

export default App
