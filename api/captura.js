import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const dados = req.body;

    const filePath = path.join(process.cwd(), 'data', 'locations.json');

    let existing = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath);
      existing = JSON.parse(raw);
    }

    const novaEntrada = {
      ...dados,
      timestamp: new Date().toISOString()
    };

    existing.push(novaEntrada);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
