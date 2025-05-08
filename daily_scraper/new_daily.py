# Counter for successfully added jobs
added_count = 0
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import staleness_of
from selenium.webdriver.support.ui import Select

from supabase import create_client
import os
from dotenv import load_dotenv

from datetime import datetime, timedelta
import pytz

eastern = pytz.timezone("US/Eastern")
now = datetime.now(eastern)
cutoff_date = now - timedelta(days=1)

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase = create_client(url, key)

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)
driver.get('https://www.volunteermatch.org/search/?l=Evanston%2C+IL%2C+USA&v=true')

# Wait for dropdown to load
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.ID, "pub_srp_sort"))
)

# Ensure the first listing title is present before retrieving it
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp'] h3"))
)
original_first = driver.find_element(By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp'] h3").text

from selenium.webdriver.common.action_chains import ActionChains

# Simulate real dropdown interaction
dropdown = driver.find_element(By.CSS_SELECTOR, "div.select-selected")
dropdown.click()

# Click the "Date Posted" option
date_posted_option = driver.find_element(By.XPATH, "//div[contains(@class, 'select-items')]//div[text()='Date Posted']")
date_posted_option.click()

WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp']"))
)

search_results = driver.find_elements(By.CSS_SELECTOR, "li[class*='pub-srp-opps__opp']")
print(f"Found {len(search_results)} results")



# Look through up to the first 30
for result in search_results[:30]:
    try:
        link = result.find_element(By.CSS_SELECTOR, "h3 a").get_attribute("href")
        print("Opening:", link)
        driver.execute_script("window.open(arguments[0]);", link)
        driver.switch_to.window(driver.window_handles[-1])


        # Try grabbing the date posted
        try:
            date_section = driver.find_element(By.CSS_SELECTOR, "section.logistics__section--date-posted")
            date_text = date_section.find_element(By.CSS_SELECTOR, "p.para").text
            print("Date Posted:", date_text)

            from datetime import datetime, timedelta
            scraped_date_obj = datetime.strptime(date_text, "%B %d, %Y")
            cutoff_date = datetime.now() - timedelta(days=1)
            if scraped_date_obj < cutoff_date:
                print(f"⏭Skipped: {date_text} is before cutoff ({cutoff_date.strftime('%B %d, %Y')})")
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                continue

            opportunity_data = {
                "title": driver.find_element(By.CSS_SELECTOR, "h1").text,
                "organization": driver.find_element(By.CSS_SELECTOR, 'h2.opp-dtl__org-name.text-sm a').text,
                "description": " ".join([p.text for p in driver.find_element(By.ID, "short_desc").find_elements(By.TAG_NAME, "p")]),
                "date": date_text,
                "location": driver.find_element(By.CSS_SELECTOR, "h4.l-location + p.left").text if driver.find_elements(By.CSS_SELECTOR, "h4.l-location + p.left") else "",
                "skills": ", ".join([el.text for el in driver.find_elements(By.CSS_SELECTOR, "section.logistics__section--skills li.item")]),
                "requirement": driver.find_element(By.CSS_SELECTOR, "section.logistics__section--requirements li.item").text if driver.find_elements(By.CSS_SELECTOR, "section.logistics__section--requirements li.item") else "",
                "url": link
            }

            response = supabase.table("jobs").insert(opportunity_data).execute()
            if response.data:
                print(f"Successfully added: {opportunity_data['title']}")
                added_count += 1
            else:
                print(f"Not added. Supabase response: {response}")
        except Exception as e:
            print("Date not found:", e)

        driver.close()
        driver.switch_to.window(driver.window_handles[0])
    except Exception as e:
        print("Error:", e)
        
    
print(f"Total new jobs added: {added_count}")
driver.quit()