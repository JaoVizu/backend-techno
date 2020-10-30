import express from 'express'
import pool from './database/database'
import { v4 as uuidv4} from 'uuid'
const routes = express.Router()

routes.get('/produtos', (req, res) => {
  async function selectProducts(){
    const client = await pool.connect()
    try{
      const result = await client.query('SELECT * FROM produtos')
      return result.rows
    }catch(ex){
      console.log(`Ocorreu um erro durante a consulta: ${ex}`)
    }finally{
      client.release()
    }
  }
  
  selectProducts().then(data => res.json(data))
  
})

routes.get('/produtos/:id', (req, res) => {
  
})

routes.post('/produtos', (req, res) => {

  const {
    nome, 
    preco,
    descricao,
    estoque,
    imgpath
  } = req.body
  const id = uuidv4()

  async function insertProduct(){
    const client = await pool.connect()
    try{
      const result = await pool.query('INSERT INTO produtos(id, nome, preco, descricao, estoque, imgpath) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [id,nome, preco, descricao, estoque, imgpath])
      res.json({message: "Produto inserido com sucesso!"})
    }catch(ex){
      console.log(`Ocorreu um erro durante a consulta: ${ex}`)
    }finally{
      client.release()
    }
  }

  insertProduct()

})

export default routes