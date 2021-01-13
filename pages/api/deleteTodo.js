import { table, getMinifyRecord } from "./utils/Airtable";
import auth0 from "./utils/auth0";
import ownsRecords from "./middleware/OwnsRecords"

export default ownsRecords(async (req, res) => {
  const { id } = req.body;

  const { user } = auth0.getSession(req)

  try {
    const deleteTodo = await table.destroy(id)

    res.statusCode = 200
    res.json(getMinifyRecord(deleteTodo))
  } catch (error) {
    res.statusCode = 500
    res.json({ message: 'Something went wrong' })
  }
})
