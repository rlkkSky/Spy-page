import { writeFile, readFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const novoDado = req.body;
  const filePath = path.join(process.cwd(), "data", "locations.json");

  try {
    let dadosExistentes = [];
    try {
      const fileContent = await readFile(filePath, "utf-8");
      dadosExistentes = JSON.parse(fileContent);
    } catch {}

    dadosExistentes.push(novoDado);

    await writeFile(filePath, JSON.stringify(dadosExistentes, null, 2));
    res.status(200).json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao salvar:", err);
    res.status(500).json({ erro: "Erro ao salvar os dados" });
  }
}
