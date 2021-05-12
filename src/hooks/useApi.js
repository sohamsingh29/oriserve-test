import axios from "axios";
import { useEffect, useState } from "react";

const GET_RECENTS = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=60&format=json&nojsoncallback=1`;

const GET_SEARCH =
  "https://www.flickr.com/services/rest/?method=flickr.photos.search&safe_search=safe&per_page=60&format=json&nojsoncallback=1";

const useApi = () => {
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [uri, setUri] = useState(GET_RECENTS);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let { data } = await axios.get(uri, {
        params: {
          api_key: process.env.REACT_APP_FLICKR_KEY,
          page,
          text: query,
          per_page: "60",
          format: "json",
        },
      });

      sethasMore(data.photos.photo.length > 0);
      setPhotoList((prevPhotoList) => [...prevPhotoList, ...data.photos.photo]);

      setLoading(false);
    };

    fetchData();
  }, [page]);

  const handleSearch = async (enquiry) => {
    window.scrollTo(0, 0);

    setPhotoList([]);
    setLoading(true);

    setUri(GET_SEARCH);
    setQuery(enquiry);
    setPage(1);

    let { data } = await axios.get(GET_SEARCH, {
      params: {
        api_key: process.env.REACT_APP_FLICKR_KEY,
        page: "1",
        text: enquiry,
        per_page: "60",
        format: "json",
      },
    });
    sethasMore(data.photos.photo.length > 0);
    setPhotoList([...data.photos.photo]);

    setLoading(false);
  };

  return { hasMore, photoList, loading, setPage, handleSearch };
};

export default useApi;
