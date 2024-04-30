import express from 'express';

const app = express();
const port = 4843;
const items = [
    {
        id: 1,
        name: "pomidoras",
        price: 8
    },
    {
        id: 2,
        name: "ogurkas",
        price: 6
    },
    {
        id: 3,
        name: "kopustas",
        price: 4
        },
    {
        id: 4,
        name: "moliugas",
        price: 10
        }
  ]
  
  
  app.get('/', (req, res) => {
    res.send('Welcome');
  });
    
  // all list
  app.get('/api/items/', (req, res) => {
    console.log('Fetching all items...');
    return res.send(JSON.stringify({items
    }));
  });
  
  //viens id
  app.get('/api/items/:id', (req, res) => {
    const item = req.params.id
    if(item){
    return res.send(JSON.stringify(
    items.filter(index => index.name === item, 
    )))}else if(!item){
    console.log('404');
    return res.send('Item not found')
  }
  });
  
  //sukurti id
  app.post('/api/items/create', (req, res) => {
    const { id, name, price } = req.body;
  
    items.push(id, name, price )
    
    res.status(201).json(newItem);
    });
    
  
    app.put('/api/items/:id', (req, res) => {
      const itemId = req.params.id;
      const { name, price } = req.body;
    
      const item = items.find(item => item.id === itemId);
    
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
    
      if (name) item.name = name;
      if (price) item.price = price;
    
      res.json(item);
    });
  
    app.delete('/api/items/:id', (req, res) => {
      const itemId = req.params.id;
    items.filter(index => index.id !== itemId)
    });
  
    app.get('*', (req, res) => {
      console.log('404');
      return res.send('404 - content not found');
  });
  
  app.use((req, res, next) => {
      return res.status(404).send("Sorry can't find that!");
  });
  
  app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
  });

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});
