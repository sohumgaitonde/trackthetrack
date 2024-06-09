from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import time
import json
import re

import chromedriver_autoinstaller
# setup chrome options
from selenium import webdriver
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless') # ensure GUI is off
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=chrome_options)


def get_names(soup): #Gets all the top 1500 names
    td_tags = soup.find_all('td', {'data-th' : "Competitor"})
    names_and_links = []

    for tag in td_tags:
      a_tag = tag.find('a')
      if a_tag:
        name = a_tag.text.strip()
        link = 'https://worldathletics.org' + a_tag['href']
        names_and_links.append((name, link))
      names_and_links = names_and_links[0:20]
    return names_and_links

def get_times(soup): #Gets the top 20 times
    td_tags = soup.find_all('td', {'data-th' : "Mark"})
    times = []
    for tag in td_tags:
      times.append(tag.text.strip())
      times = times[0:20]
    return times
def get_venues(soup):
    td_tags = soup.find_all('td', {'data-th' : "Venue"})
    venues = []
    for tag in td_tags:
      venues.append(tag.text.strip())
      venues = venues[0:20]
    return venues
def get_dates(soup):
    td_tags = soup.find_all('td', {'data-th' : "Date"})
    dates = []
    for tag in td_tags:
      dates.append(tag.text.strip())
      dates = dates[0:20]
    return dates
  

def top20_scrape():
    html= requests.get('https://worldathletics.org/records/toplists/middlelong/1500-metres/all/men/senior/2024?regionType=countries&region=usa&page=1&bestResultsOnly=true&maxResultsByCountry=all&eventId=10229502&ageCategory=senior')
    if html.status_code != 200:
        raise Exception ('error {}'.format(html))
    soup = bs(html.text, 'lxml')

    athletics_dict = {
    'Athlete':get_names(soup),
    'Mark':get_times(soup),
    'Venue':get_venues(soup),
    'Date':get_dates(soup)
    }
    return pd.DataFrame(athletics_dict)

top20_df = top20_scrape()
top20_df.to_json('1500m.json', orient='records')