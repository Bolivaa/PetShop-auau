import express from 'express';
import conexao from './infra/conexao.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cors());

// Rotas para clientes
app.get('/clientes', (req, res) => {
    const sqlClientes = "SELECT ClienteID, Nome, CPF, Telefone, Email FROM clientes;";
    conexao.query(sqlClientes, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.get('/clientes/nome/:nome', (req, res) => {
    const nomeCliente = req.params.nome;
    const sqlClientes = "SELECT * FROM clientes WHERE Nome LIKE ?;";

    conexao.query(sqlClientes, [`%${nomeCliente}%`], (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: erro.message });
        } else if (resultado.length === 0) {
            res.status(404).json({ mensagem: "Cliente não encontrado" });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.get('/clientes/:id', (req, res) => {
    const idClientes = req.params.id;
    const sqlClientes = "SELECT * FROM clientes WHERE ClienteID = ?;";
    conexao.query(sqlClientes, [idClientes], (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(404).json({ 'erro': 'Cliente não encontrado' });
        }
    });
});

app.put('/clientes/:id', (req, res) => {
    const idClientes = req.params.id;
    const putClientes = req.body;
    const sqlClientes = "UPDATE clientes SET ? WHERE ClienteID = ?;";
    conexao.query(sqlClientes, [putClientes, idClientes], (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json({ message: 'Cliente atualizado com sucesso' });
        }
    });
});

app.post('/clientes', (req, res) => {
    const postClientes = req.body;
    const sqlClientes = "INSERT INTO clientes SET ?;";
    conexao.query(sqlClientes, postClientes, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(201).json(resultado);
        }
    });
});

app.delete('/clientes/:id', (req, res) => {
    const idClientes = req.params.id;
    const sqlClientes = "DELETE FROM clientes WHERE ClienteID = ?;";
    conexao.query(sqlClientes, idClientes, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro});
        } else {
            res.status(200).json(resultado);
        }
    });
});


// Rotas para consultas
app.get('/consultas', (req, res) => {
    const sqlConsultas = "SELECT * FROM consultas;";
    conexao.query(sqlConsultas, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.get('/consultas/:id', (req, res) => {
    const idConsultas = req.params.id;
    const sqlConsultas = "SELECT * FROM consultas WHERE ConsultaID = ?;";
    conexao.query(sqlConsultas, idConsultas, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.post('/consultas', (req, res) => {
    const postConsultas = req.body;
    const sqlConsultas = "INSERT INTO consultas SET ?;";
    conexao.query(sqlConsultas, postConsultas, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(201).json(resultado);
        }
    });
});

app.delete('/consultas/:id', (req, res) => {
    const idConsultas = req.params.id;
    const sqlConsultas = "DELETE FROM consultas WHERE ConsultaID = ?;";
    conexao.query(sqlConsultas, idConsultas, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.put('/consultas/:id', (req, res) => {
    const idConsultas = req.params.id;
    const putConsultas = req.body;
    const sqlConsultas = "UPDATE consultas SET ? WHERE ConsultaID = ?;";
    conexao.query(sqlConsultas, [putConsultas, idConsultas], (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

// Rotas para funcionários
app.get('/funcionarios', (req, res) => {
    const sqlFuncionarios = "SELECT * FROM funcionarios;";
    conexao.query(sqlFuncionarios, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.get('/funcionarios/:id', (req, res) => {
    const idFuncionarios = req.params.id;
    const sqlFuncionarios = "SELECT * FROM funcionarios WHERE FuncionarioID = ?;";
    conexao.query(sqlFuncionarios, idFuncionarios, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao buscar dados do funcionario' });
        } else if (resultado.length === 0) {
            res.status(404).json({ erro: 'funcionario não encontrado' });
        } else {
            res.status(200).json(resultado[0]); // Retorna apenas o objeto
        }
    });
});

app.post('/funcionarios', (req, res) => {
    const postFuncionarios = req.body;
    const sqlFuncionarios = "INSERT INTO funcionarios SET ?;";
    conexao.query(sqlFuncionarios, postFuncionarios, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(201).json(resultado);
        }
    });
});

app.delete('/funcionarios/:id', (req, res) => {
    const idFuncionarios = req.params.id;
    const sqlFuncionarios = "DELETE FROM funcionarios WHERE FuncionarioID = ?;";
    conexao.query(sqlFuncionarios, idFuncionarios, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.put('/funcionarios/:id', (req, res) => {
    const idFuncionarios = req.params.id;
    const putFuncionarios = req.body;
    const sqlFuncionarios = "UPDATE funcionarios SET ? WHERE FuncionarioID = ?;";
    conexao.query(sqlFuncionarios, [putFuncionarios, idFuncionarios], (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

// Rotas para pets
app.get('/pets', (req, res) => {
    const sqlPets = "SELECT * FROM pets;";
    conexao.query(sqlPets, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.get('/pets/:id', (req, res) => {
    const idPets = req.params.id;
    const sqlPets = "SELECT * FROM pets WHERE PetID = ?;";
    conexao.query(sqlPets, [idPets], (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao buscar dados do pet' });
        } else if (resultado.length === 0) {
            res.status(404).json({ erro: 'Pet não encontrado' });
        } else {
            res.status(200).json(resultado[0]); // Retorna apenas o objeto
        }
    });
});


app.post('/pets', (req, res) => {
    const postPets = req.body;
    const sqlPets = "INSERT INTO pets SET ?;";
    conexao.query(sqlPets, postPets, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(201).json(resultado);
        }
    });
});

app.delete('/pets/:id', (req, res) => {
    const idPets = req.params.id;
    const sqlPets = "DELETE FROM pets WHERE PetID = ?;";
    conexao.query(sqlPets, idPets, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.put('/pets/:id', (req, res) => {
    const idPets = req.params.id;
    const putPets = req.body;
    const sqlPets = "UPDATE pets SET ? WHERE PetID = ?;";
    conexao.query(sqlPets, [putPets, idPets], (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

// Rotas para serviços
app.get('/servicos', (req, res) => {
    const sqlServicos = "SELECT * FROM servicos;";
    conexao.query(sqlServicos, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.get('/servicos/:id', (req, res) => {
    const idServicos = req.params.id;
    const sqlServicos = "SELECT * FROM servicos WHERE ServicoID = ?;";
    conexao.query(sqlServicos, idServicos, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao buscar dados do pet' });
        } else if (resultado.length === 0) {
            res.status(404).json({ erro: 'Pet não encontrado' });
        } else {
            res.status(200).json(resultado[0]); // Retorna apenas o objeto
        }
    });
});

app.post('/servicos', (req, res) => {
    const postServicos = req.body;
    const sqlServicos = "INSERT INTO servicos SET ?;";
    conexao.query(sqlServicos, postServicos, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(201).json(resultado);
        }
    });
});

app.delete('/servicos/:id', (req, res) => {
    const idServicos = req.params.id;
    const sqlServicos = "DELETE FROM servicos WHERE ServicoID = ?;";
    conexao.query(sqlServicos, idServicos, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.put('/servicos/:id', (req, res) => {
    const idServicos = req.params.id;
    const putServicos = req.body;
    const sqlServicos = "UPDATE servicos SET ? WHERE ServicoID = ?;";
    conexao.query(sqlServicos, [putServicos, idServicos], (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

//Rota para histórico
app.post('/historico', (req, res) => {
    const postHistorico = req.body;
    console.log('Dados recebidos:', postHistorico); // Log para verificar os dados
    const sqlHistorico = "INSERT INTO historico SET ?;";
    conexao.query(sqlHistorico, postHistorico, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(201).json(resultado);
        }
    });
});

app.get('/historico/:id', (req, res) => {
    const idHistorico = req.params.id;
    const sqlHistorico = "SELECT * FROM historico WHERE PetID = ?;";
    conexao.query(sqlHistorico, idHistorico, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao buscar historico' });
        } else if (resultado.length === 0) {
            res.status(404).json({ erro: 'Historico não encontrado' });
        } else {
            res.status(200).json(resultado[0]); // Retorna apenas o objeto
        }
    });
});

app.put('/historico/:id', (req, res) => {
    const idHistorico = req.params.id;
    const putHistorico = req.body;
    const sqlHistorico = "UPDATE historico SET ? WHERE PetID = ?;";
    conexao.query(sqlHistorico, [putHistorico, idHistorico], (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.delete('/historico/:id', (req, res) => {
    const idHistorico = req.params.id;
    const sqlHistorico = "DELETE FROM historico WHERE PetID = ?;";
    conexao.query(sqlHistorico, idHistorico, (erro, resultado) => {
        if (erro) {
            res.status(404).json({ 'erro': erro });
        } else {
            res.status(200).json(resultado);
        }
    });
});


// //Rota para cadastrar usuario com senha hash
// app.post('/login', async (req, res) => {
//     const { email, senha } = req.body;

//     // Define o número de salt rounds (aumenta a segurança, mas também o tempo de execução)
//     const saltRounds = 10;

//     try {
//         // Gera o hash da senha usando bcrypt
//         const senhaHash = await bcrypt.hash(senha, saltRounds);

//         // Define o SQL para inserir o usuário com a senha hashada
//         const sql = "INSERT INTO login (Email, Senha) VALUES (?, ?);";

//         // Executa a query para salvar o usuário e a senha hashada no banco de dados
//         conexao.query(sql, [email, senhaHash], (erro, resultado) => {
//             if (erro) {
//                 return res.status(500).json({ erro: 'Erro ao registrar o usuário', detalhe: erro });
//             }

//             return res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
//         });
//     } catch (erro) {
//         return res.status(500).json({ erro: 'Erro no servidor', detalhe: erro });
//     }
// });

// ROta para deletar cadastro de login
// app.delete('/login/:id', (req, res) => {
//     const idLogin = req.params.id;
//     const sqlLogin = "DELETE FROM login WHERE LoginID = ?;";
//     conexao.query(sqlLogin, idLogin, (erro, resultado) => {
//         if (erro) {
//             res.status(404).json({ 'erro': erro });
//         } else {
//             res.status(200).json(resultado);
//         }
//     });
// });


//Validaçao de tela de login
const SECRET_KEY = 'DevExplorers';

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM login WHERE Email = ?;";
    
    conexao.query(sql, [email], async (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: 'Erro no servidor', detalhe: erro });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        const usuario = resultado[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        // Se a senha estiver correta, gera o token JWT
        const token = jwt.sign({ id: usuario.UsuarioID, email: usuario.email }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ mensagem: 'Login bem-sucedido', token });
    });
});

export default app