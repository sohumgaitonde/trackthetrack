from googleapiclient.discovery import build
import os
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

athletes = ['Cooper Teare', 'Yared Nuguse', 'Hobbs Kessler', 'Colin Sahlman', 'Nico Young', 'Nathan Green']

def authenticate_spotify():
    """Authenticate with Spotify using Client Credentials."""
    client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    return sp

def search_spotify(sp, name):
    """Search Spotify for a given name."""
    results = sp.search(q=name, type='episode', market='US')
    return results

sp = authenticate_spotify()
search_results = []

for name in athletes:
  result = search_spotify(sp, name)
  search_results.append(result)

    # Write the results to a JSON file
with open('spotify_search_results.json', 'w') as outfile:
  json.dump(search_results, outfile, indent=4)

