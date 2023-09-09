const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../ambiente');

async function verificaToken(req, res, next) {

    const acessoToken = req.headers.authorization;

    const token = acessoToken.split(' ')[1];

    jwt.verify(token, TOKEN_SECRET, (error, usuario) => {
        if (error) {
            return res.status(401).json({ message: "Não autorizado!" });
        }
        req.idUsuario = usuario.id;
        next();
    })
}

module.exports = verificaToken