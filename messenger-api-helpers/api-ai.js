







POST https://api.api.ai/v1/query?v=20150910

Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json; charset=utf-8

POST body:
{
    "query": [
        "and for tomorrow"
    ],
    "contexts": [{
        "name": "weather",
        "lifespan": 4
    }],
    "location": {
        "latitude": 37.459157,
        "longitude": -122.17926
    },
    "timezone": "America/New_York",
    "lang": "en",
    "sessionId": "1234567890"
}