import { table, getMinifyRecord } from "./utils/Airtable";

export default async (req, res) => {
  const { id } = req.body;
  try {
    const deleteTodo = await table.destroy(id)

    res.statusCode = 200
    res.json(getMinifyRecord(deleteTodo))
  } catch (error) {
    res.statusCode = 500
    res.json({ message: 'Something went wrong' })
  }
};
