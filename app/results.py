from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import time
import json
import re

import chromedriver_autoinstaller
# setup chrome options
from selenium import webdriver
import selenium.webdriver as webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
chrome_options = webdriver.ChromeOptions()
#chrome_options.add_argument('--headless') # ensure GUI is off
#chrome_options.add_argument('--no-sandbox')
#chrome_options.add_argument('--disable-dev-shm-usage')
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
    html= requests.get('https://worldathletics.org/records/toplists/middlelong/1500-metres/all/men/senior/2024?regionType=world&page=1&bestResultsOnly=true&maxResultsByCountry=all&eventId=10229502&ageCategory=senior')
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

def create_profile_list():
  profile_list = []
  for i in range(20):
    indiv = top20_df.iloc[i]
    profile_list.append(indiv.values[0][1])
  return profile_list

profile_links = create_profile_list()
profile_links

driver = webdriver.Chrome(options=chrome_options)
driver.get(profile_links[0])
driver.maximize_window()
actions = ActionChains(driver)

athlete_info = {}

# get rid of cookies pop-up
initial_url = profile_links[0]
html = requests.get(initial_url)
soup = bs(html.text, 'lxml')
driver.get(initial_url)
time.sleep(3)
wait = WebDriverWait(driver, 10) 
cookies = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div[1]/div[2]/a')))
  
cookies.click()
time.sleep(3)


for i in range(len(profile_links)):
  if i != 0:
    url = profile_links[i]
    html = requests.get(url)
    soup = bs(html.text, 'lxml')
    driver.get(url)
    time.sleep(3)
  
  # getting athlete info
  name = driver.find_element(By.CLASS_NAME, 'profileBasicInfo_athleteDetails__3mrB0')
  first_name = name.find_element(By.XPATH, './/div/div[1]/div/div/h1/span[1]')
  last_name = name.find_element(By.XPATH, './/div/div[1]/div/div/h1/span[2]')
  full_name = first_name.text + " " + last_name.text
  print(full_name)

  
  test = driver.find_elements(By.CLASS_NAME, 'profileBasicInfo_statValue__IXJTW')
  nationality = test[0].text
  print(test[0].text)
  age = test[3].text
  
  '''
  personal_info = driver.find_elements(By.CLASS_NAME, "profileBasicInfo_stats__RB2La")
  print(personal_info[0])
  nationality = personal_info[0].find_element(By.XPATH, ".//div[2]").text
  birthday = personal_info[1].find_element(By.XPATH, ".//div[2]").text
  age = personal_info[3].find_element(By.XPATH, ".//div[2]").text
  print(age)
  '''
  time.sleep(1)
  achievements = driver.find_elements(By.CLASS_NAME, "profileStatistics_countWrapper__38JNR")

  achievements_list = []
  for achievement in achievements:
    count = achievement.find_elements(By.XPATH, './/span')
  
    achievements_list.append({count[1].text: count[0].text})
  print(achievements_list)
  time.sleep(1)
  
  #go to results tab
  if i == 0:
    element = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div[5]/div/div[1]/ul/li[4]')))
  elif not achievements_list:
    element = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div[4]/div/div[1]/ul/li[4]')))
  else:
    element = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div[5]/div/div[1]/ul/li[4]')))
  time.sleep(3)
  element.click()

  time.sleep(1)

  #get the events and loop over them getting results

  headlines = driver.find_elements(By.CLASS_NAME, 'profileStatistics_tableName__2qDVZ')
  events = []
  for h in headlines:
    if not '\n' in h.text:
      events.append(h.text)
  #print(events)
  print(events)
  result_tables = driver.find_elements(By.TAG_NAME, "tbody")
  results_header = driver.find_elements(By.TAG_NAME, "thead")
  single_header = results_header[0]
  columns = single_header.find_elements(By.XPATH, './/tr/th')
  #print(columns)
  header = []
  for col in columns:
    header.append(col.text)
  #print(header)
  
  results = {}
  
  all_tables_data = []

  # Iterate over each table
  for i in range(len(events)):
    table = result_tables[i]
    
    # Initialize a list to hold the data for the current table
    table_data = []

    # Locate all rows within the table's tbody
    rows = table.find_elements(By.XPATH, './/tr')
  
    # Iterate over each row
    for row in rows:
        # Initialize a list to hold the data for the current row
        row_data = {}
        
        # Locate all cells (td) within the current row
        cells = row.find_elements(By.XPATH, './/td')
        row_data['event'] = headlines[i].text
        # Iterate over each cell and get its text
        for j in range(len(cells)):
            row_data[header[j]] = cells[j].text
            
        # Add the row data to the table data
        table_data.append(row_data)
    
    results[headlines[i].text] = table_data
    # Add the table data to the list of all tables data
    all_tables_data.append(results) 
  indiv_info = {}
  indiv_info['nationality'] = nationality
  indiv_info['achievements'] = achievements_list
  indiv_info['results'] = all_tables_data
  indiv_info['name'] = full_name
  indiv_info['age'] = age
  athlete_info[last_name.text.lower()] = indiv_info
  print(indiv_info)
print(athlete_info)
with open('all_athlete_info.json', 'w') as json_file:
    json.dump(athlete_info, json_file, indent=4)

'''



url = profile_links[0]
html = requests.get(url)
soup = bs(html.text, 'lxml')
driver.get(url)
time.sleep(3)

# getting athlete info
first_name = driver.find_element(By.XPATH, '/html/body/div[2]/div[3]/div[2]/div/div[1]/div/div/h1/span[1]')
last_name = driver.find_element(By.XPATH, '/html/body/div[2]/div[3]/div[2]/div/div[1]/div/div/h1/span[2]')
name = first_name.text + " " + last_name.text

nationality = driver.find_elements(By.XPATH, "/html/body/div[2]/div[3]/div[2]/div/div[2]/div[2]/div[2]")
nationality = nationality[0].text
birthday = driver.find_elements(By.XPATH, '/html/body/div[2]/div[3]/div[2]/div/div[2]/div[3]/div[2]')
birthday = birthday[0].text
age = driver.find_elements(By.XPATH, '/html/body/div[2]/div[3]/div[2]/div/div[2]/div[5]/div[2]')
age = age[0].text

time.sleep(1)

#get achievements
achievements = driver.find_elements(By.CLASS_NAME, "profileStatistics_countWrapper__38JNR")

achievements_list = []
for achievement in achievements:
  count = achievement.find_elements(By.XPATH, './/span')
  
  achievements_list.append({count[1].text: count[0].text})

time.sleep(1)

#go to results tab
element = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div[5]/div/div[1]/ul/li[4]')))

time.sleep(3)
element.click()

time.sleep(1)

#get the events and loop over them getting results

headlines = driver.find_elements(By.CLASS_NAME, 'profileStatistics_tableName__2qDVZ')
events = []
for h in headlines:
  if not '\n' in h.text:
    events.append(h.text)
#print(events)
result_tables = driver.find_elements(By.TAG_NAME, "tbody")
results_header = driver.find_elements(By.TAG_NAME, "thead")
single_header = results_header[0]
columns = single_header.find_elements(By.XPATH, './/tr/th')
#print(columns)
header = []
for col in columns:
  header.append(col.text)
#print(header)

results = {}
  
all_tables_data = []

# Iterate over each table
for i in range(len(events)):
    table = result_tables[i]
    
    # Initialize a list to hold the data for the current table
    table_data = []

    # Locate all rows within the table's tbody
    rows = table.find_elements(By.XPATH, './/tr')
  
    # Iterate over each row
    for row in rows:
        # Initialize a list to hold the data for the current row
        row_data = {}
        
        # Locate all cells (td) within the current row
        cells = row.find_elements(By.XPATH, './/td')
        row_data['event'] = headlines[i].text
        # Iterate over each cell and get its text
        for j in range(len(cells)):
            row_data[header[j]] = cells[j].text
            
        # Add the row data to the table data
        table_data.append(row_data)
    
    results[headlines[i].text] = table_data
    # Add the table data to the list of all tables data
    all_tables_data.append(results) 
#print(results)
  
#print(all_tables_data)
athlete_info = {}
athlete_info['nationality'] = nationality
athlete_info['birthday'] = birthday
athlete_info['age'] = age
athlete_info['achievements'] = achievements_list
athlete_info['name'] = name
with open('athlete_info.json', 'w') as json_file:
    json.dump(all_athlete_info, json_file, indent=4)

with open('cooper.json', "w") as json_file:
    json.dump(results, json_file,indent=4)
    



#<div class="profileStatistics_tableName__2qDVZ">800 Metres</div>
#<table class="profileStatistics_table__1o71p"
'''