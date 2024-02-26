import json
# import openai
from openai import OpenAI
import pymongo
import os
from bson.objectid import ObjectId
import requests
import uuid
from datetime import datetime
from bs4 import BeautifulSoup

clientai = OpenAI(
    api_key="sk-3fDZ61sHd_r0IDKbLpBgCA",
    base_url="https://4veynppxjm.us-east-1.awsapprunner.com", # base_url represents the endpoint the OpenAI object will make a call to when invoked
)

model = "gpt-4-turbo"
# model = "amazon.titan-text-lite-v1"

MONGO_URI = os.environ['MONGO_URI']
client = pymongo.MongoClient(MONGO_URI)
db = client['Content']  # Replace with your database name
collection = db['medical content']  # Replace with your collection name
# openai.api_key = os.environ['api_key']
today = datetime.today()
print(today)

def lambda_handler(event, context):

    if not event.get("prompt"):
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Please provide valid prompt"}),
        }
    
    generate = event.get("generate")
    if generate == "outline":
        return generate_outline(event)
    elif generate == "content":
        return generate_content(event)
    elif generate == "regenerate":
        return regenerate_text(event)
    else:
        return {"statusCode": 400, "body": "Invalid operation"}


    
def generate_outline(event):
    # prompt = "Provide Information Gen AI"
    prompt = event.get("prompt")
    token = event.get("token")
    temp = event.get("temperature")
    
    # Add error handling and logging options to improve robustness
    try:
        
        response = clientai.chat.completions.create(
                model=model, 
                messages=[{"role": "user","content": prompt}],
                max_tokens=token,
                temperature=temp,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0,
                stop=None)
        
        
        # response = openai.completions.create(
        #     model="gpt-3.5-turbo-instruct",
        #     prompt=prompt,
        #     max_tokens=token,
        #     temperature=temp,
        #     top_p=1.0,
        #     frequency_penalty=0.0,
        #     presence_penalty=0.0,
        #     stop=None,
        # )
        
        print(response.model_dump()["choices"][0]["message"]["content"])
        openai_response = response.model_dump()["choices"][0]["message"]["content"]
        # openai_response = response.choices[0].text
    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        openai_response = "An error occurred. Please try again later."

    return {
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps({
            "response": openai_response
        })
    }
    

def generate_content(event):
    # prompt = "Provide Information Gen AI"
    prompt = event.get("prompt")
    token = event.get("token")
    temp = event.get("temperature")
    # Create a template for prompt.
    final_prompt = f"Generate Blog on {prompt}. Answer must be embedded in HTML document."
    
    # Add error handling and logging options to improve robustness
    try:
        
        response = clientai.chat.completions.create(
                model=model, 
                messages=[{"role": "user","content": prompt}],
                max_tokens=token,
                temperature=temp,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0,
                stop=None)
        
        # response = openai.completions.create(
        #     model="gpt-3.5-turbo-instruct",
        #     prompt=final_prompt,
        #     max_tokens=token,
        #     temperature=temp,
        #     top_p=1.0,
        #     frequency_penalty=0.0,
        #     presence_penalty=0.0,
        #     stop=None,
        # )
        
        # print(response.model_dump()["choices"][0]["message"]["content"])
        openai_response = response.model_dump()["choices"][0]["message"]["content"]
        
        # openai_response = response.choices[0].text
        # print(openai_response)
        # Generate unique ID with ObjectId
        response_id = str(uuid.uuid4())[:6]
        response = extractTitleBody(openai_response)
        # # Extract title and body
        title = str(response['title'])
        body = str(response['body'])
        
        image_links= generateImage(event)
        
        # Store response in MongoDB
        # data = {"id": response_id, "prompt": prompt, "response": openai_response, "date": today}
        data = {"id": response_id, "prompt": prompt, "title": str(title),"body": str(body), "date": today,
        "image_link": "src","author":"xyz"}
        collection.insert_one(data)

        
        
    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        openai_response = "An error occurred. Please try again later."
        

    return {
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps({
            "id": str(response_id),
            "title": str(title),
            "maincontent": str(body),
            "imagelinks": image_links
        })
    }

def regenerate_text(event):
    # prompt = "Provide Information Gen AI"
    prompt = event.get("prompt")
    token = event.get("token")
    temp = event.get("temperature")
    
    # Add error handling and logging options to improve robustness
    try:
        
        response = clientai.chat.completions.create(
                model=model, 
                messages=[{"role": "user","content": prompt}],
                max_tokens=token,
                temperature=temp,
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0,
                stop=None)
        
        
        # response = openai.completions.create(
        #     model="gpt-3.5-turbo-instruct",
        #     prompt=prompt,
        #     max_tokens=token,
        #     temperature=temp,
        #     top_p=1.0,
        #     frequency_penalty=0.0,
        #     presence_penalty=0.0,
        #     stop=None,
        # )
        
        
        # print(response.model_dump()["choices"][0]["message"]["content"])
        openai_response = response.model_dump()["choices"][0]["message"]["content"]
        
        # openai_response = response.choices[0].text
    except Exception as e:
        
        
        print(f"Error calling OpenAI: {e}")
        openai_response = "An error occurred. Please try again later."

    return {
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps({
            "response": openai_response
        })
    }
    

def generateImage(event):
    prompt = event.get("prompt")
    word = prompt.replace(" ","-")
    url = f'https://unsplash.com/s/photos/{word}'
    content = requests.get(url).content
    soup = BeautifulSoup(content,"html.parser")
    
    images = soup.findAll('img',limit=10)
    image_links=[]
    for image in images:
        image_links.append(image.get("src"))
    return image_links



def extractTitleBody(html_content):

  try:
    soup = BeautifulSoup(html_content, 'html.parser')
    # Extract title
    title = soup.find('title')
    
    body = soup.find('body')

    return {'title': title, 'body': body}
  except Exception as e:
    print(f"Error extracting title and body: {e}")
    return None
    