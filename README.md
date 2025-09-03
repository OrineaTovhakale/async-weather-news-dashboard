Async Weather & News Dashboard
A Node.js + TypeScript project demonstrating asynchronous programming with callbacks, promises, and async/await. Fetches weather from Open-Meteo API and news headlines from DummyJSON Posts API.
Table of Contents
Project Overview
Setup
Usage
Learning Outcomes
Sample Outputs
Project Overview
This project showcases async patterns:
Callbacks: Using https module with nested callbacks ("callback hell").
Promises: Using axios with chaining, Promise.all(), and Promise.race().
Async/Await: Refactored promises with try...catch for error handling.
APIs Used:
Weather: Open-Meteo (Berlin example). News: DummyJSON Posts.
Setup
Clone the repository: git clone https://github.com/<your-username>/async-weather-news-dashboard.git cd async-weather-news-dashboard
Install dependencies: npm install

Usage
Run each version to see async patterns in action:
Callback: npm run callback
Promise: npm run promise
Async/Await: npm run async
Outputs are logged to the console. Customize locations or limits by editing the source files (e.g., change latitude/longitude in URLs).
Learning Outcomes
Callbacks: Simple but leads to nested "hell" for sequential tasks; error handling is manual per callback.
Promises: Cleaner chaining for sequences; Promise.all() for concurrency (faster parallel fetches); Promise.race()for quickest response (useful for timeouts or fallbacks).
Async/Await: Syntactic sugar over promises; makes code read like sync but async; try...catch simplifies error handling.
General: Async programming manages I/O efficiently without blocking the event loop. Error consistency improves debugging.
Sample Outputs
Callback Version
Fetching weather and news with callbacks...
Weather in Berlin: 15.2°C
Latest News Headlines:
- His mother had always taught him
- He was determined to make her proud
- He always aspired to do something
- She always enjoyed spending time
- He always admired her ability
More News Headlines:
- He always dreamed of becoming
- She always had a way with her
- He always thought of her as
- She always loved the way
- He always enjoyed spending time


Promise Version
Fetching with Promise chaining...
Weather in Berlin: 15.2°C
Latest News Headlines:
- His mother had always taught him
- He was determined to make her proud
- He always aspired to do something
- She always enjoyed spending time
- He always admired her ability
Fetching weather and news concurrently with Promise.all...
Weather in Berlin: 15.2°C
Latest News Headlines:
- His mother had always taught him
- He was determined to make her proud
- He always aspired to do something
- She always enjoyed spending time
- He always admired her ability
Fetching fastest response with Promise.race...
Fastest Response - Weather: 15.2°C


Async/Await Version
Fetching with async/await sequentially...
Weather in Berlin: 15.2°C
Latest News Headlines:
- His mother had always taught him
- He was determined to make her proud
- He always aspired to do something
- She always enjoyed spending time
- He always admired her ability
Fetching weather and news concurrently with async/await and Promise.all...
Weather in Berlin: 15.2°C
Latest News Headlines:
- His mother had always taught him
- He was determined to make her proud
- He always aspired to do something
- She always enjoyed spending time
- He always admired her ability
Fetching fastest response with async/await and Promise.race...
Fastest Response - News Headlines:
- His mother had always taught him
- He was determined to make her proud
- He always aspired to do something
- She always enjoyed spending time
- He always admired her ability
