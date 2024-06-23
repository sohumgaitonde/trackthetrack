# !pip install google-api-python-client
from googleapiclient.discovery import build
import os
import json

API_KEY = os.getenv('API_KEY')
youtube = build('youtube', 'v3', developerKey=API_KEY)

output = 'youtube_results.json'

all_results = {}

def search_videos(query, max_results = 6):
  search_response = youtube.search().list(
      q=query,
      part='snippet',
      type='video',
      order='date',
      maxResults = max_results
  ).execute()

  videos = []

  for item in search_response['items']:
    video_info = {
        'title':item['snippet']['title'],
        'videoId': item['id']['videoId']
    }
    videos.append(video_info)

  return videos

athletes = ['Cooper Teare', 'Yared Nuguse', 'Hobbs Kessler', 'Colin Sahlman', 'Nico Young', 'Nathan Green', 'Abdisa Fayisa']
add_on = 'Interview Workout'
for indiv in athletes:
  query = str(indiv) + " " + str(add_on)
  results = search_videos(query)
  all_results[indiv] = results

with open(output, "w") as json_file:
    json.dump(all_results, json_file,indent=4)

print("Results have been written to", output)
