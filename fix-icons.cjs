const icons = require("simple-icons");
const keys = Object.keys(icons);
const broken = ["terraform", "javascript", "kubernetes", "prometheus"];

broken.forEach((term) => {
  const matches = keys.filter((k) => k.toLowerCase().includes(term));
  console.log(`${term}:`, matches);
});
