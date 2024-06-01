import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ViewBlog from '../Viewblog';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BlogCard =  ({blogData}) => {

  const navigate = useNavigate();

  const [id, setid] = React.useState(null);

  console.log("blogData in the card", blogData);
  // 

  function openBlog() {
    
    console.log("idddd in blogCard", blogData.id);
    // const blogID = blogData.id
    navigate('/viewblog', { state: { blogID:blogData.id }});
  }
  // console.log("blogData in the card", blogData);
  // const [blogData, setblogData] = React.useState()

  //   const openBlog = async () => {
  //     try {
  //       const formData = {
  //         "operation" : "get_all"
  //       }

  //       const response = await axios.post("https://sgfq0sbbhe.execute-api.us-east-2.amazonaws.com/default/DB",formData);
  //         setblogData(response.data.body);
  //         console.log(response.data.body);
  
  //     } catch (err) {
  //       // setError(err);
  //       console.log("error", err);
  //     } finally {
  //       // setLoading(false);
  //     }
  //     if (blogData) {
  //       <Link to={{ pathname: '/viewblog', state: blogData }}></Link>
  //     }
  //   }
  return (
    <Card sx={{ maxWidth: 345 }}>
    <button onClick={openBlog}>
      <CardMedia
        component="img"
        height="140"
        src="https://pharmanewsintel.com/images/site/article_headers/_normal/2.21111111.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blogData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
            blogData.body.substring(0,100)
          }
        </Typography>
      </CardContent>
    </button>
    <CardActions>
      <Button size="small" color="primary">
        {blogData.date}
      </Button>
      
    </CardActions>
  </Card>
  )
}

export default BlogCard
