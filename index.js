import express from 'express';
//id: (Math.floor(Math.random() * 10000) + 1).toString();
// id: Date.now().toString();
const app = express();
const port = 4850;
let items = [ 
{ 
  id: "122001", 
  name: "Premium Dog Food", 
  description: "High-quality dog food for all breeds.", 
  price: 20.99, 
  category: "Food"
},
{ 
  id: "122002", 
  name: "Interactive Dog Toy", 
  description: "Keep your dog entertained for hours!", 
  price: 15.49, 
  category: "Toys" 
},
{ 
  id: "122003", 
  name: "Cat Scratching Post", 
  description: "Durable scratching post for cats.", 
  price: 24.99, 
  category: "Furniture" 
},
{
  id: "122004", 
  name: "Comfortable Cat Bed", 
  description: "Soft and cozy bed for your feline friend.", 
  price: 19.99, 
  category: "Beds" 
}
]
let shops = [
  {
  id: "TZ001",
  name: "TechZone",
  address: "10 Central Street, Kyiv",
  contact: "0441234567",
  services:"Electronics and accessories sales"
},
{
  id: "PP002",
  name: "Pet Paradise",
  address: "123 Main St, Cityville",
  contact: "+1234567890",
  services: ["Pet grooming", "Pet food", "Pet toys"],
},
{
  id: "PC003",
  name: "Paws & Claws",
  address: "Kaunas, Taikos prosp.",
  contact: "37876543210",
  services: ["Pet grooming", "Pet accessories", "Pet boarding"]
},
{
  id: "CS004",
  name: "Coffee World",
  address: "25 Hrushevskoho Avenue, Lviv",
  contact: "0329876543",
  services: "Coffee and beverages sales"
}
];

app.use(express.json())

 
  app.get('/', (req, res) => {
    return res.send('Welcome')
  });
    
  // all list
  app.get('/api/items/', (req, res) => {
    console.log('Fetching all items...');
    return res.send(JSON.stringify({items}));
  });
  app.get('/api/shops/', (req, res) => {
    console.log('Fetching all shops...');
    return res.send(JSON.stringify({shops}));
  });

  //viens id
  app.get('/api/items/:id', (req, res) => {
    const item = req.params.id
    if(item){
    return res.send(JSON.stringify(
    items.filter(index => index.id === item, 
    )))}else if(!item){
    console.log('404');
    return res.send('Item not found')
  }});
  app.get('/api/shops/:id', (req, res) => {
    const shop = req.params.id;
    console.log('Fetching:)', `${shop}` );
    if(shop){
    return res.send(JSON.stringify(
    shops.filter(index => index.id === shop, 
    )))}else if(!shop){
    console.log('404');
    return res.send('Item not found')
  }});
  
  //sukurti id
  app.post('/api/items/', (req, res) => {
    console.log(req.body); 
  const { id, name, description, price, category } = req.body;
  const newItem = {id, name, description, price, category}
  shops.push(newItem)
  res.status(201).json(newItem);
  });

  app.post('/api/shops/', (req, res) => {
  console.log(req.body); 
  console.log('Fetching new shop :)');
  const { id, name, address, contact, services } = req.body;
  const newShop = { id, name, address, contact, services };
  shops.push(newShop)
  res.status(201).json(newShop);
  });
  
  //change id
  app.put('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const { name, price } = req.body;
  const item = items.filter(item => item.id === itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (name) item.name = name;
  if (price) item.price = price;
  res.json(item);
});
  app.put('/api/shops/:id', (req, res) => {
  const shopId = req.params.id;
  const { address, contact } = req.body;
  const shop = shops.filter(index => index.id === shopId);
  if (!shop) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (address) shop.address = address;
  if (contact) shop.contact = contact;
  res.json(shop);
});
  
//delete id
  app.delete('/api/items/:id', (req, res) => {
  const itemId = +req.params.id;
  items = items.filter(index => index.id !== itemId)

 
  res.status(200).json({ message: 'Item deleted successfully' });
});

  app.delete('/api/shops/:id', (req, res) => {
    const shopId = req.params.id;
    shops = shops.filter(index => index.id !== shopId)

    res.status(200).json({ message: 'Shop deleted successfully' });
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
