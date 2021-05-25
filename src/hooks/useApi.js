import axios from "axios";
import { useEffect, useState } from "react";

const GET_RECENTS = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=60&format=json&nojsoncallback=1`;

const GET_SEARCH =
  "https://www.flickr.com/services/rest/?method=flickr.photos.search&safe_search=safe&per_page=60&format=json&nojsoncallback=1";
// api logic of the app
const useApi = () => {
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page number of api
  const [query, setQuery] = useState(""); // user search query
  const [uri, setUri] = useState(GET_RECENTS); // api base uri
  const [hasMore, setHasMore] = useState(true); // if api has more photos

  useEffect(() => {
    // useEffect for getting data on page number change and adding to list
    const fetchData = async () => {
      setLoading(true);

      let { data } = await axios.get(uri, {
        params: {
          api_key: process.env.REACT_APP_FLICKR_KEY,
          page,
          text: query,
          per_page: "20",
          format: "json",
        },
      });

      setHasMore(data.photos.photo.length > 0);
      setPhotoList((prevPhotoList) => [...prevPhotoList, ...data.photos.photo]);

      setLoading(false);
    };

    fetchData();
  }, [page, query, uri]);

  const handleSearch = async (enquiry) => {
    window.scrollTo(0, 0); // scroll to top on search

    setPhotoList([]);

    setUri(GET_SEARCH);
    setQuery(enquiry);
    setPage(1);
  };

  return { hasMore, photoList, loading, setPage, handleSearch };
};

export default useApi;
