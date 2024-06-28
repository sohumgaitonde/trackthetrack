# !pip install google-api-python-client
from googleapiclient.discovery import build
import os
import json

API_KEY = os.getenv('API_KEY')
youtube = build('youtube', 'v3', developerKey=API_KEY)

output = 'youtube_results.json'

all_results = {}

def search_videos(query, max_results = 10):
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
athletes = []
f = open('1500m.json')
data1500 = json.load(f)
for i in range(len(data1500)):
  athletes.append(data1500[i]['Athlete'][0])
f.close()
f = open('800m.json')
data800 = json.load(f)
for i in range(len(data800)):
  athletes.append(data800[i]['Athlete'][0])
f.close()
f = open('5000m.json')
data5000 = json.load(f)
for i in range(len(data5000)):
  athletes.append(data5000[i]['Athlete'][0])
f.close()
f = open('10000m.json')
data10000 = json.load(f)
for i in range(len(data10000)):
  athletes.append(data10000[i]['Athlete'][0])
f.close()


add_on = 'Interview'
for indiv in athletes:
  query = str(indiv) + " " + str(add_on)
  results = search_videos(query)
  all_results[indiv] = results

with open(output, "w") as json_file:
    json.dump(all_results, json_file,indent=4)

print("Results have been written to", output)
