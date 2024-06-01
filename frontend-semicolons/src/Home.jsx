import {useState, useEffect} from "react";
import DNAEffect from "./DNAEffect.tsx";
import BlogCard from "./components/BlogCard";
import axios from "axios";


const Home = () => {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    console.log("In Fetch Data");
    setIsLoading(true); // Set loading state to true

    const formData = {
      "operation" : "get_all"
    }
    try {
      const response = await axios.post('https://sgfq0sbbhe.execute-api.us-east-2.amazonaws.com/default/DB',formData);
      console.log(response); // Log response to console
      setBlogData(response.data.body);
      console.log("in request",response.data.body); // Log response data to console
    } catch (err) {
      console.error(err); // Log error to console
      setError(err.message); // Set error state to error message
    } finally {
      setIsLoading(false); // Set loading state to false after request finishes
    }
  };

  useEffect(() => {
    console.log("In Home");
    fetchData();
  }, []); 
 
  return(
    <div>
      <DNAEffect></DNAEffect>
      <div className="flex justify-center gap-12 flex-wrap m-8">
    
      {
        blogData? blogData.map((item) => {
          console.log("In Home", item);
          return <BlogCard key={item.id} blogData={item}/>
        }) : <p>Loading</p>
        
        }
        </div>


    </div>

    );
};

export default Home;
