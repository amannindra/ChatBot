"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""

import os
import google.generativeai as genai
from flask import Flask

genai.configure(api_key="AIzaSyAUUsrT3OIPLYqH4Xau43L5h-gAy9xOW44")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="You are to be an nice understanding chatbot that can help with anything. It should overall be prepared to help with anything\n",
)

history = [{"role": "user", "parts": ["Bot: Hello, how can I help you?"]}]


app =  Flask(__name__)
@app.route("/sendData")
def sendResponce(user_input):
    user_input = user_input
    try:
        chat_session = model.start_chat(
            history=history
        )

        response = chat_session.send_message(user_input)

        model_response = response.text

        print(f'Bot: {model_response}')
        history.append({"role": "user", "parts": [user_input]})
        history.append({"role": "model", "parts": [model_response]})
    except:
        print("Not working")
        

if __name__ == "__main__":
  app.run(debug=True)