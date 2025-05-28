const express = require("express");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/signup");

const Client = require("./models/client");
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const messagesRoutes = require("./routes/messages");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/notes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
require("./config/connect");

// Middleware pour parser les requêtes JSON si nécessaire
app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/clients", clientRoutes);
app.use("/messages", messagesRoutes);
app.use("/taskstotal", taskRoutes);
app.use("/notes", noteRoutes);

app.post("/register", async (req, res) => {
  try {
    const data = req.body;

    const user = new User(data);
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass = await bcrypt.hashSync(data.password, salt);
    user.password = cryptedPass;
    const savedUser = await user.save();

    res.status(201).send(savedUser);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", err);
    res.status(500).send("Erreur serveur");
  }
});

app.post("/login", async (req, res) => {
  try {
    const data = req.body;

    // Vérifier si l'email et le mot de passe sont fournis
    if (!data.email || !data.password) {
      return res.status(400).send("Email et mot de passe requis !");
    }

    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).send("Email ou mot de passe invalide !");
    }

    // Vérifier si le mot de passe correspond
    const validPass = bcrypt.compareSync(data.password, user.password);
    if (!validPass) {
      return res.status(401).send("Email ou mot de passe invalide !");
    }

    // Créer un payload pour le token
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Générer un token JWT
    // const token = jwt.sign(payload, "123456", { expiresIn: "1h" }); // Durée de validité du token : 1 heure
    const token = jwt.sign(payload, process.env.JWT_SECRET || "123456", {
      expiresIn: "1h", // Durée de validité du token : 1 heure
    });

    // Répondre avec le token
    res.status(200).send({ mytoken: token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).send("Erreur serveur");
  }
});

app.post("/create", async (req, res) => {
  try {
    data = req.body;
    const user = new User(data);
    savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.send(error);
  }
});

app.get("/getall", async (req, res) => {
  try {
    console.log("Requête reçue sur /getall");

    const users = await User.find({}, "_id name email");
    console.log("Utilisateurs récupérés :", users);

    const clients = await Client.find({}, "_id name email");
    console.log("Clients récupérés :", clients);

    const allUsers = [...users, ...clients];

    res.json(allUsers);
    console.log("Réponse envoyée avec succès !");
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des utilisateurs et clients:",
      err
    );
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

app.put("/update", (req, res) => {
  console.log("update work");
});

// Route pour mettre à jour les paramètres utilisateur
app.post("/updateSettings", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456");
    const userId = decoded._id;
    const { email, name, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les champs
    if (email) user.email = email;
    if (name) user.name = name;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    
    // Ne pas renvoyer le mot de passe
    user.password = undefined;
    res.status(200).json({ 
      message: "Paramètres mis à jour",
      user 
    });

  } catch (error) {
    console.error("Erreur updateSettings:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token invalide" });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
});


app.listen(3000, () => {
  console.log("server work");
});
