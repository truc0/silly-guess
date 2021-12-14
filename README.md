# Silly Guess

This is an API backend for a guessing game.

## Deploy

TBA

## Docs

### Normal API

| url | method | request | response | description |
| :-: | :-: | :-: | :-: | :-: |
| /   | GET | | { "count": 0 } | the created game number |
| /   | POST | { "max": 100 } | { "token": "\<uuid\>" } | ID for the new created game in UUID form, answer is [0, max) |
| /\<uuid\>   | GET | | { "guess\_cnt": 0, "status": "solved" } | status can be **solved**, **unsolved** |
| /\<uuid\>/guess   | { "guess": \<guess\> } | POST | { "message": "too large", code: 1 } | see description below |

For the last API:
- message can be: `"too large"`, `"too small"`, `"bingo"`
- the corresponding code of message are: `2`, `1`, `0`

### API in cheat mode

| url | method | example | description |
| :-: | :-: | :-: | :-: |
| /\<uuid\>/   | GET | { "count": 0, "answer": 0 } | answer is the number you guess |

The API except the above one are preserved.

