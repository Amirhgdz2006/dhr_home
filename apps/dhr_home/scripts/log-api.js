// Simple Node script to fetch the test API and print JSON to the terminal
const url = process.env.TEST_API_URL ?? 'http://localhost:1338/api/test';

try {
  const res = await fetch(url);
  const json = await res.json();
  console.log("Fetched from:", url);
  console.log(JSON.stringify(json, null, 2));
} catch (err) {
  console.error("Error fetching API test endpoint:", err);
  process.exitCode = 1;
}
