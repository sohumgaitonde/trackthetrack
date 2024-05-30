# !pip install google-api-python-client
from googleapiclient.discovery import build
import os

API_KEY = os.getenv('API_KEY')

print(API_KEY)

youtube = build('youtube', 'v3', developerKey=API_KEY)

def search_videos(query, max_results = 5):
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

athletes = ['Yared Nuguse', 'Cole Hocker', 'Hobbs Kessler', 'Eric Holt', 'Samuel Prakel', 'Cooper Teare', 'Vincent Ciattei', 'Henry Wynne', 'Casey Comber', 'Craig Engels']
add_on = 'Interview Workout Podcast'
for indiv in athletes:
  query = str(indiv) + " " + str(add_on)
  results = search_videos(query)

  print(str(indiv.upper()) + " VIDEO RESULTS")
  for idx, video in enumerate(results):
      print(f"{idx+1}. {video['title']}")
      print(f"   Video URL: https://www.youtube.com/embed/{video['videoId']}")
      print()