"use client";
import {useState, useEffect} from "react";
// import { calsans } from "@/fonts/calsans";
// import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../src/components/ui/tracing-beam.tsx";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import "./viewblog.css";
import {useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function ViewBlog(props) {
 const image=
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
 
  const location = useLocation();
  const blogID = location.state.blogID



  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function openVerificationEditor() {
    // console.log("idddd", id);
    navigate('/verify', { state: { blog:blogData.body }});
  }

  const fetchData = async () => {
    console.log("In Fetch Data");
    setIsLoading(true); // Set loading state to true

    const formData = {
      "operation": "get_by_id",
      "id": blogID
    }
    try {
      const response = await axios.post('https://sgfq0sbbhe.execute-api.us-east-2.amazonaws.com/default/DB',formData);
      console.log(response); // Log response to console
      setBlogData(response.data.body);
      console.log(response.data.body); // Log response data to console
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


  
  return (
    <TracingBeam>
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        
         {
          blogData ?
         ( <div key={`content-${blogData.id}`} className="my-10">
            <h2 className="bg-black text-white rounded-full text-5xl w-fit py-1">
            {blogData.title}
            </h2>
            <div className="flex flex-row w-full justify-between items-center mb-10 mt-6 text-white">
              <div className="flex flex-row gap-6 items-center">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                <div>
                  <div className="text-xl font-semibold text-white ">
                    Prajwal Padal
                  </div>
                  <div className="text-slate-400">{blogData.date}</div>
                </div>
              </div>
              <div className="flex flex-row gap-6">
                <button 
                onClick={openVerificationEditor}
                className="px-4 py-1 border-2 rounded-md bg-gradient-to-b from-blue-500 to-blue-600  focus:ring-2 focus:ring-blue-400 hover:shadow-xl">
                  Verify blog
                </button>

              </div>
            </div>

            <div className="text-sm text-white prose prose-sm dark:prose-invert">
              {image && (
                <img
                  src={image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              <>
              <div dangerouslySetInnerHTML={{ __html: blogData.body  }} />
              </>
            </div>
          </div>): 
          ( <div>Loading...</div>)
        }
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: " Protecting Ourselves, Protecting Each Other: How to Stop the Spread of COVID-19",
    description: (
      <div>

        <p>
          <strong>Introduction:</strong>
        </p>
        <p>
          Hello, and welcome to the fight against COVID-19. I&#39;m Dr. Anthony
          Fauci, and I&#39;m here to guide you through the essential steps we
          can all take to protect ourselves and each other from this pandemic.
        </p>
        <p>
          COVID-19 has undoubtedly been a challenging journey, but I&#39;m proud
          to see the resilience and strength shown by communities worldwide.
          Today, I want to empower you with knowledge and actionable strategies
          to help control the spread of the virus.
        </p>
        <p>
          <strong>Individual Responsibility:</strong>
        </p>
        <p>
          Our collective well-being depends on each individual taking
          responsibility for their health and the health of others. Here are key
          strategies proven to reduce transmission:
        </p>
        <p>
          <strong>Vaccination:</strong>
        </p>
        <p>
          The single most effective tool we have is vaccination. Please get
          vaccinated and boosted if eligible. Vaccination protects you and those
          around you, creating a safer community environment.
        </p>
        <p>
          <strong>Masking:</strong>
        </p>
        <p>
          Masks are a crucial barrier against infection. They significantly
          reduce the number of viral particles released when you cough, sneeze,
          or talk. Choose a mask that fits snugly and wear it correctly.
        </p>
        <p>
          <strong>Physical Distancing:</strong>
        </p>
        <p>
          Maintain a safe distance from others, especially in crowded areas.
          Keep at least 6 feet away from others, and avoid close contact with
          vulnerable individuals.
        </p>
        <p>
          <strong>Hand Hygiene:</strong>
        </p>
        <p>
          Wash your hands frequently with soap and water, especially before
          eating and after touching surfaces in public spaces. Proper
          handwashing reduces the risk of infection. Additionally, use a tissue
          when coughing or sneezing and dispose of it properly.
        </p>
        <p>
          <strong>Staying Home When Sick:</strong>
        </p>
        <p>
          If you&#39;re feeling unwell, it&#39;s crucial to self-isolate and
          avoid contact with others. This will help prevent the spread of the
          virus.
        </p>
        <p>
          <strong>Addressing Concerns:</strong>
        </p>
        <p>
          I understand there may be concerns about certain prevention
          strategies. Let me address some common misconceptions:
        </p>
        <ul>
          <li>
            <strong>Face shields:</strong> While face shields offer some
            protection, they are not as effective as masks at preventing
            infection. Masks remain the recommended protection.
          </li>
          <li>
            <strong>Rapid tests:</strong> Although rapid tests provide quick
            results, they are not always accurate. If you have symptoms,
            it&#39;s best to get a PCR test for a definitive diagnosis.
          </li>
        </ul>
        <p>
          <strong>Staying Informed:</strong>
        </p>
        <p>
          Stay informed about the latest public health guidelines and updates.
          Reliable sources, such as the World Health Organization and the
          Centers for Disease Control and Prevention, provide accurate
          information and resources.
        </p>
        <p>
          <strong>Empowerment:</strong>
        </p>
        <p>
          Together, we can make a difference. By following these simple yet
          effective strategies, we can collectively steer the tide of this
          pandemic. Let&#39;s work together, protect ourselves, protect each
          other, and ultimately, build a healthier and safer future.
        </p>
        <p>
          <strong>Additional Resources:</strong>
        </p>
        <ul>
          <li>Centers for Disease Control and Prevention (CDC): [URL]</li>
          <li>World Health Organization (WHO): [URL]</li>
        </ul>
        <p>
          <strong>
            Thank you for your time, and let&#39;s all work towards a brighter
            tomorrow.
          </strong>
        </p>
        
      </div>
    ),
    badge: "React is very nice library",
     },
];
