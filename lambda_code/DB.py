import json
import pymongo  # Ensure compatibility with your Lambda environment
import os
from bson.objectid import ObjectId
from datetime import datetime
from bs4 import BeautifulSoup

# Securely fetch MongoDB connection details from environment variables
MONGO_URI = os.environ['MONGO_URI']
client = pymongo.MongoClient(MONGO_URI)
db = client['Content']  # Replace with your database name
collection = db['medical content']  # Replace with your collection name
today = datetime.today()

def lambda_handler(event, context):
    # Determine operation based on event data
    operation = event.get("operation")
    if operation == "create":
        return create_data(event)
    elif operation == "get_by_id":
        return get_by_id(event)
    elif operation == "get_all":
        return get_all(event)
    elif operation == "update":
        return update_data(event)
    elif operation == "delete":
        return delete_data(event)
    else:
        return {"statusCode": 400, "body": "Invalid operation"}


def get_all(event):
    
    try:
        query = {} 
        projection = {"_id": 0, "id": 1, "title": 1, "body": 1, "date": 1, "image_link": 1, "author": 1}
        cursor = collection.find(query, projection)
        # Convert the cursor to a list of dictionaries
        result = list(cursor)
        for item in result:
            item['date'] = item['date'].isoformat()
        for x in result:
            response = extractTitleBody(x['title'], x['body'])
            x['title'] = str(response['title'])
            x['body'] = str(response['body'])
            
        if result:
            # return {"statusCode": 200, "body": json.dumps(result)}
            return {"statusCode": 200, "body": result}
        else:
            return {"statusCode": 404, "body": "Not found"}
    except Exception as e:
        print("Error is ",e)
        return {"statusCode": 500, "body": str(e)}


def get_by_id(event):
    id = event.get("id")
    if not id:
        return {"statusCode": 400, "body": "Missing ID"}
    try:
        projection = {"_id": 0, "id": 1, "title": 1, "body": 1, "date": 1, "image_link": 1, "author": 1}
        result = collection.find_one({"id": id}, projection)
        result['date'] = result['date'].isoformat()
        print(result)
        
        response = extractTitleBody(result['title'], result['body'])
        result['title'] = str(response['title'])
        # result['body'] = str(response['body'])
        if result:
            # return {"statusCode": 200, "body": json.dumps(result)}
            return {"statusCode": 200, "body": result}
        else:
            return {"statusCode": 404, "body": "Not found"}
    except Exception as e:
        print("Error is ",e)
        return {"statusCode": 500, "body": str(e)}


def update_data(event):
    id = event.get("id")
    body = event.get("body")
    image_link = event.get("image_link")
    if not id or not data:
        return {"statusCode": 400, "body": "Missing ID or data"}

    try:
        
        if event.get("author"):
            author = event.get("author")
            result = collection.update_one({"id": id}, {"$set": {"body": body, "author": author, "image_link":image_link}})
        else:
            result = collection.update_one({"id": id}, {"$set": {"body": body, "image_link":image_link}})
            
        if result.modified_count == 1:
            return {"statusCode": 200, "body": "Response updated successfully"}
        else:
            return {"statusCode": 404, "body": "Document not found"}
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}

def delete_data(event):
    id = event.get("id")
    if not id:
        return {"statusCode": 400, "body": "Missing ID"}

    try:
        result = collection.delete_one({"id": id})
        return {"statusCode": 204}
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}
        
        
def create_data(event):
    data = event.get("data")
    if not data:
        return {"statusCode": 400, "body": "Missing data"}

    try:
        result = collection.insert_one(data)
        return {"statusCode": 201, "body": str(result.inserted_id)}
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}


def extractTitleBody(title, body):
  try:
    soup = BeautifulSoup(title, 'html.parser')
    # Extract title
    title = soup.find('title')
    # print("title",title)
    if title:
      title = title.text.strip()
    else:
      title = None
    
    soup1 = BeautifulSoup(body, 'html.parser')
    body = soup1.find('body')
    # print("body",body)
    if body:
      # Remove script and style tags to avoid unnecessary text
      for tag in body.find_all(['script', 'style']):
        tag.decompose()
      body_text = body.get_text(separator='\n').strip()
    else:
      body_text = None

    return {'title': title, 'body': body_text}
  except Exception as e:
    print(f"Error extracting title and body: {e}")
    return None