from googleapiclient.discovery import build
import os
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

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

def authenticate_spotify():
    """Authenticate with Spotify using Client Credentials."""
    client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    return sp

def search_spotify(sp, name):
    """Search Spotify for a given name."""
    results = sp.search(q=name, type='episode', market='US')
    return results
def filter_results(results, person_name):
    """Filter results to include only those that match the full name more closely."""
    filtered_results = []
    for item in results['episodes']['items']:
        if person_name.lower() in item['description'].lower() or person_name.lower() in item['name'].lower():
          if '2024' in item['release_date']:
              filtered_results.append(item)
    episodes = {"episodes": filtered_results}
    return episodes

sp = authenticate_spotify()
search_results = {}

for name in athletes:
  result = search_spotify(sp, name)
  filtered_results = filter_results(result, name)
  search_results[name] = filtered_results
  
  

    # Write the results to a JSON file
with open('spotify_search_results.json', 'w') as outfile:
  json.dump(search_results, outfile, indent=4)

