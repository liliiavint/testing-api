import items from itemsShop.json


app.get('/', (req, res) => {
  return res.send('Home page');
});
  
// all list
app.get('/api/items', (req, res) => {
  return res.send(JSON.stringify());
});
app.get('/api/items/:id', (req, res) => {
  return res.send(JSON.stringify());
});
  

  app.post('/api/items', (req, res) => {
  
  });
  

  app.put('/api/items/:id', (req, res) => {

  });
  

  app.delete('/api/items/:id', (req, res) => {
  
  });