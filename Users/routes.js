import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const { role } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }

        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.sendStatus(401);
        }
    };
    const signout = (req, res) => {
        req.session.destroy();

        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }

        res.json(currentUser);
    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}

// the below is my old code. the above is the starter code from the project

// import db from "../Database/index.js";

// export default function Users(app) {
//   app.get("/api/users", (req, res) => {
//     res.send(db.users);
//   });

//   const register = (req, res) => {
//     const { username, password } = req.body;
//     const user = db.users.find((user) => user.username === username);
//     if (user) {
//       res.send(400);
//     } else {
//       const newUser = { username, password, _id: Date.now().toString() };
//       req.session["currentUser"] = newUser;
//       db.users.push(newUser);
//       res.send(newUser);
//     }
//   };
//   const login = (req, res) => {
//     const { username, password } = req.body;
//     const user = db.users.find(
//       (user) => user.username === username && user.password === password
//     );
//     if (user) {
//       req.session["currentUser"] = user;
//       res.send(user);
//     } else {
//       res.send(401);
//     }
//   };
//   const logout = (req, res) => {
//     req.session.destroy();
//     res.send("User logged out");
//   };
//   const profile = (req, res) => {
//     const currentUser = req.session["currentUser"];
//     if (currentUser) {
//       res.send(currentUser);
//     } else {
//       res.send(401);
//     }
//   };
//   app.post("/api/users/register", register);
//   app.post("/api/users/login", login);
//   app.post("/api/users/logout", logout);
//   app.get("/api/users/profile", profile);
// }
