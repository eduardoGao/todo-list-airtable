import { table, getMinifyRecord } from "./utils/Airtable";

export default async (req, res) => {
  const { id, fields } = req.body;
  try {
    const updatedRecords = await table.update([{
      id,
      fields
    }]);

    res.statusCode = 200
    res.json(getMinifyRecord(updatedRecords[0]))
  } catch (error) {
    res.statusCode = 500
    res.json({ message: 'Something went wrong' })
  }
}