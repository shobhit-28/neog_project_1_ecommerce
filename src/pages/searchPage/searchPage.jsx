import { useContext, useEffect } from 'react'
import './searchPage.css'
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext'

export const SearchPage = () => {
    const { searchBarData, searchData, setIsSearchModalOpen } = useContext(ProductReducerContext)

    const searchResults = searchData?.filter(({ title }) => title.slice(0, searchBarData?.length).toLowerCase() === searchBarData?.toLowerCase());

    const searchSuggestions = searchData?.filter(({ title }) => title.slice(0, searchBarData?.length).toLowerCase() !== searchBarData?.toLowerCase())
        ?.filter(({ title }) => title.toLowerCase()?.includes(searchBarData?.toLowerCase()))

    useEffect(() => {
        setIsSearchModalOpen(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="search-page">
            {searchBarData.length === 0 ?
                <p>Enter a keyword or product name in the search bar above to start exploring.</p>
                : searchData.length === 0 ?
                    <p>Oops! We couldn't find any items matching your search criteria. Please try a different search term or browse through our categories to find what you're looking for.</p>
                    : <div className="data-found">
                        {searchResults?.length > 0 &&
                            <div className="data-search-results">
                                <p className="heading">Search Results</p>
                                {searchResults?.map((product) => (
                                    <div className="product" key={product?._id}>
                                        <p className="product-title">{product?.title}</p>
                                    </div>
                                ))}
                            </div>
                        }
                        {searchSuggestions?.length > 0 &&
                            <div className="data-search-suggestions">
                                <p className="heading">Search Suggestions</p>
                                {searchSuggestions?.map((product) => (
                                    <div className="product" key={product?._id}>
                                        <p className="product-title">{product?.title}</p>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
            }
        </div>
    )
}
