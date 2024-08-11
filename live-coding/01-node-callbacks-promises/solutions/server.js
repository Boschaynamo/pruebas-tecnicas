import express from 'express'
const app = express()
const port = 3000

app.use(express.json())

let list = [{
    id: 1,
    content: 'Item 1'
  }]



app.get('/items', (req, res) => {
  return res.status(200).json(list)
})
app.get('/items/:id', (req, res) => {
  const {id} = req.params;
  return res.status(200).json(list.find((each)=> {
    console.log(each.id,id);
    
    return each.id.toString() === id}))
})

app.post('/items', (req, res) => {
  
  const item={id:list.length+1,content:req.body.content}
  list.push(item)
  return res.status(200).json(item)
})

app.delete('/items/:id',(req,res)=>{
  const {id} = req.params;
  list = list.filter((each)=> each.id.toString() !== id)
  
  return res.status(200).send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const server = app.listen(process.env.PORT ?? 3000);

export {app,server};