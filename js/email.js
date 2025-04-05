curl --request POST \
  --url https://api.mailersend.com/v1/email \
  --header 'Authorization: Bearer API_KEY_HERE' \
  --header 'content-type: application/json' \
  --data '{
      "to": [
        {
          "email": "recipient@email.com"
        }
      ],
      "from": {
        "email": "your@email.com"
      },
      "subject": "Personalization",
      "html": "<p>Hi {{name|default('there')}}, Thank you for shopping with us all the way from {{country}}.</p>",
      "personalization": [
    {
      "email": "test@mailersend.com",
      "data": {
        "name": "Recipient name",
        "country": "Recipient Country"
      }
			]
    }