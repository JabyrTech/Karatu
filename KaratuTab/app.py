import openai

# Initialize the OpenAI client
openai.api_key = 'YOUR_API_KEY'

response = openai.Completion.create(
  model="gpt-4-turbo",
  prompt="Make a single page website that shows off different neat JavaScript features for drop-downs and things to display information. The website should be an HTML file with embedded JavaScript and CSS.",
  max_tokens=1500
)

html_content = response['choices'][0]['text']

# Print the generated HTML content
print(html_content)


import pandas as pd

df = pan