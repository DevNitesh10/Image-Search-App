import { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 36;


function App() {  
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

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
        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
      console.log(error);
    }
  }, [page]);

  useEffect(() =>  {
    fetchImages();
  }, [fetchImages]) ;  
  
  const resetSearch = () => {
    setPage(1);
    fetchImages();
  }

  const handleSearch = (event) => {
    event.preventDefault(); //prevents page reload
    console.log(searchInput.current.value); //points to input field we assigned to ref.
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };
  console.log('Page', page)
  return (
    <div className='container'>
    <h1 className='title'>Image Search</h1>
    {setErrorMsg && <p className='error-msg'>{errorMsg}</p>}
    <div className="search-section">
      <Form onSubmit={handleSearch}>
      <Form.Control type="search"
       placeholder="Type Something to Search..."
       className='search-input'
       ref={searchInput} />
      </Form>
    </div>
    <div className="filters">
      <div onClick={() => handleSelection('nature')}>Nature</div>
      <div onClick={() => handleSelection('birds')}>Birds</div>
      <div onClick={() => handleSelection('cats')}>Cats</div>
      <div onClick={() => handleSelection('shoes')}>Shoes</div>
    </div>
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
