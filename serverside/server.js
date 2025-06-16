const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/recipe', async (req, res) => {
    const { ingredient, country, category, search } = req.query;
    let url = '';

    if (search) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`;
    } else if (ingredient) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
    } else if (country) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(country)}`;
    } else if (category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
    } 
    else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    }
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

app.get('/api/recipe/:id', async (req, res) => {
    const id = req.params.id;    
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`);
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
