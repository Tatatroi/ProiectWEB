if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Database configuration that works for both local and production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    `postgresql://postgres:password@localhost:5432/TripPlanner`,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false }
    : false
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Successfully connected to PostgreSQL database');
    release();
  }
});

// USERS API

app.post("/api/users", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  try {
    await pool.query(
      "INSERT INTO users (nume, prenume, mail, parola) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, email, password]
    );
    res.json({ mes: "Utilizator adăugat!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Eroare la inserare!" });
  }
});

// GET TRIPS FOR USER

app.get("/api/users", async (req, res) => {
  const { email, password } = req.query;

  try {
    // Verifică dacă email și password sunt furnizate
    if (!email || !password) {
      return res.status(400).json({ mes: "Email și parolă necesare" });
    }

    const result = await pool.query(
      "SELECT id, mail, parola FROM users WHERE mail = $1 AND parola = $2",
      [email, password] // Doar 2 parametri, nu include idUser
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ mes: "Eroare, email sau parola greșite" });
    }

    // Adaugă răspuns de succes - include și ID-ul
    res.status(200).json({
      mes: "Autentificare reușită",
      user: {
        id: result.rows[0].id, // Adaugă ID-ul în răspuns
        email: result.rows[0].mail,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Eroare internă de server" });
  }
});

// TRIPS API ----------------------------------------------------------------------------------------------------------------------

// GET endpoint pentru a obține toate călătoriile cu informații despre utilizatori
app.get("/api/trips", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.destination, t.date, t.description, 
              t.user_id, u.first_name, u.last_name, u.email
       FROM trips t
       INNER JOIN users u ON t.user_id = u.id
       ORDER BY t.date DESC`
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Eroare la obținerea călătoriilor:", err);
    res.status(500).json({ mes: "Eroare internă de server" });
  }
});

// GET endpoint pentru a obține o călătorie specifică după ID
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, destination, date, budget, transportation, accommodation, notes, description FROM trips WHERE user_id = $1",
      [id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Eroare la preluarea călătoriilor" });
  }
});

// INSERT TRIP

// app.get('/api/trips/user/:userId', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const result = await pool.query(
//       `SELECT t.id, t.destination, t.date, t.description,
//               t.user_id, u.first_name, u.last_name, u.email
//        FROM trips t
//        INNER JOIN users u ON t.user_id = u.id
//        WHERE t.user_id = $1
//        ORDER BY t.date DESC`,
//       [userId]
//     );

//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(`Eroare la obținerea călătoriilor pentru utilizatorul ${userId}:`, err);
//     res.status(500).json({ mes: "Eroare internă de server" });
//   }
// });

// Completează endpoint-ul POST pentru adăugarea unei călătorii
app.post("/api/trips", async (req, res) => {
  const {
    destination,
    date,
    description,
    user_id,
    budget,
    accommodation,
    transportation,
    notes,
  } = req.body;
  console.log(req.body);

  // Verifică dacă toate câmpurile necesare sunt prezente
  if (
    !destination ||
    !date ||
    !description ||
    !user_id ||
    !budget ||
    !accommodation ||
    !transportation ||
    !notes
  ) {
    return res.status(400).json({ mes: "Toate câmpurile sunt obligatorii" });
  }

  try {
    // Inserează călătoria
    const result = await pool.query(
      "INSERT INTO trips(destination, date, description, user_id, budget, accommodation, transportation, notes) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        destination,
        date,
        description,
        user_id,
        budget,
        accommodation,
        transportation,
        notes,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Eroare la adăugarea călătoriei:", err);
    res.status(500).json({ mes: "Eroare internă de server" });
  }
});

// UPDATE TRIP
app.put("/api/trips/:id", async (req, res) => {
  const { id } = req.params;
  const {
    destination,
    date,
    description,
    budget,
    accommodation,
    transportation,
    notes
  } = req.body;

  try {
    const result = await pool.query(
      "UPDATE trips SET destination = $1, date = $2, description = $3, budget = $5, accommodation = $6, transportation = $7, notes = $8 WHERE id = $4 RETURNING *",
      [destination, date, description, id, budget, accommodation, transportation, notes]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mes: "Călătoria nu a fost găsită" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Eroare la actualizarea călătoriei" });
  }
});

// DELETE TRIP
app.delete("/api/trips/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM trips WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mes: "Călătoria nu a fost găsită" });
    }

    res.json({ mes: "Călătoria a fost ștearsă", trip: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Eroare la ștergerea călătoriei" });
  }
});



// LOG IN API

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const result = await pool.query(
      "SELECT id, mail, nume, prenume FROM users WHERE mail = $1 AND parola = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ mes: "Email sau parolă incorectă" });
    }

    res.status(200).json({
      user: {
        id: result.rows[0].id,
        email: result.rows[0].mail,
        firstName: result.rows[0].nume,
        lastName: result.rows[0].prenume
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mes: "Eroare server" });
  }
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});