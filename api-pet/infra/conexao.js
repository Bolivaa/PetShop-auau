import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'renato1985',
    database: 'bdpetshop'
})

conexao.connect()

export default conexao