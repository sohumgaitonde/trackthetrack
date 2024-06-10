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


url = profile_links[0]
html = requests.get(url)
soup = bs(html.text, 'lxml')
driver.get(url)
time.sleep(3)

wait = WebDriverWait(driver, 10)
cookies = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div[1]/div[2]/a')))
cookies.click()
time.sleep(4)


element = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div[5]/div/div[1]/ul/li[4]')))
#element2 = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/div[5]/div/div[2]/div/div[1]/div[2]/div[1]/div/table/tbody/tr[3]/td[1]/a')))

#element3 = wait.until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[2]/section[2]/div[1]/div[1]/div/h1')))


time.sleep(3)
#print(button_list.text)
#print(button_list)


#print("Is element clickable:", element.is_enabled() and element.is_displayed())
#print("Element text:", button_list.text)
#actions.move_to_element(element3).perform()
time.sleep(3)
element.click()
#<div class="profileStatistics_tab__1Blal profileStatistics_active__1QQ9F">Results</div>

#button_list[3].send_keys('\n')


'''
for button in button_list:
  print(button.text)
  if button.text == "Results":
    button.click()

'''

time.sleep(1)

headlines = driver.find_elements(By.CLASS_NAME, 'profileStatistics_tableName__2qDVZ')
events = []
for h in headlines:
  if not '\n' in h.text:
    events.append(h.text)
print(events)
result_tables = driver.find_elements(By.TAG_NAME, "tbody")
results_header = driver.find_elements(By.TAG_NAME, "thead")
single_header = results_header[0]
columns = single_header.find_elements(By.XPATH, './/tr/th')
print(columns)
header = []
for col in columns:
  header.append(col.text)
print(header)

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
print(results)
  
#print(all_tables_data)


with open('cooper.json', "w") as json_file:
    json.dump(results, json_file,indent=4)

#<div class="profileStatistics_tableName__2qDVZ">800 Metres</div>
#<table class="profileStatistics_table__1o71p"