import React from 'react'
import './styles/Home.css'
import ScaleLoader  from "react-spinners/ScaleLoader";
import logo from '../static//Unsplash_wordmark_logo.svg'
function Home() {

    const [query, setQuery] = React.useState('')
    const [images, setImages] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [page, setPage] = React.useState(1)
    const [hasMore, setHasMore] = React.useState(false)


    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const searchImages = async (e) => {
        handleSubmit(e)
    }

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}&per_page=12`)
            const data = await response.json()
           
            setImages(data.results)
            setLoading(false)
            setHasMore(true)
        } catch (error) {
            
            setError(true)
            setLoading(false)
           
        }
    }





  return (
    <div className='home'>

            <div className='container'>
                <h1>Image Search</h1>
                <p>Powered by <img src={logo} alt='logo' /></p>
                <form onSubmit={searchImages} >
                <input type='text' name='query' required placeholder='Search for anything... ' onChange={handleChange}/>
                <button>Search</button>
                </form>
            
            </div>


                {loading ?  <ScaleLoader 
                      color="#FFF"
                        height={20}
                        width={3}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />:

                <>
                
                
               { error || (images.length===0 && hasMore===true) ? <div className='error'>Something went wrong...</div>
                :  <div className='results'>

                
                
                {images.map((image) => {
                    return (

                       <div className='image-container' key={image.id}> 
                        <div className='image'>
                        <img src={image.urls.small} alt={image.alt_description}/>
                        </div>
                            <div className='text'>
                                    <h2>{image.alt_description}</h2>
                                    <p>By: {image.user.name}</p>
                                    <a href={image.urls.raw}>Download</a>

                            </div>

                        </div>
                    
                    )})
                }
                

                </div>}

                { images.length!==0 && <div className='load-more'
                onClick={(e) => {
                    setPage(page + 1);
                    handleSubmit(e);
                }} >Load More
                </div>}

                    
                </>
                
                
                }
                
                
    
      
    </div>
  )
}

export default Home
