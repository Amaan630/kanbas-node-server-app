import db from "../Database/index.js";

export default function Quizzes(app) {
    // CRUD
    // Read all quizzes
    app.get("/api/quizzes", (req, res) => {
        res.send(db.quizzes);
    });
    // Read one quiz by id
    app.get("/api/quizzes/:id", (req, res) => {
        const id = req.params.id;
        const quiz = db.quizzes.find((m) => m._id === id);
        if (!quiz) {
            return res.status(404).send("Quiz not found");
        }
        res.send(quiz);
    });
    app.get("/api/courses/:courseId/quizzes", (req, res) => {
        const courseId = req.params.courseId;
        const quizzes = db.quizzes.filter((m) => m.course === courseId);
        res.send(quizzes);
    });
    // Create a new quiz
    app.post("/api/courses/:courseId/quizzes", (req, res) => {
        const courseId = req.params.courseId;
        const quiz = {
            ...req.body,
            _id: Date.now().toString(),
            course: courseId,
            name: `Quiz ${db.quizzes.length + 1}`,
            description: "This is a new quiz",
            dueDate: new Date().toISOString(),
            availableDate: new Date().toISOString(),
            availableUntilDate: new Date().toISOString(),
        };
        db.quizzes.push(quiz);
        res.send(quiz);
    });
    // Update a quiz
    app.put("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quizIndex = db.quizzes.findIndex((m) => m._id === qid);
        db.quizzes[quizIndex] = {
            ...db.quizzes[quizIndex],
            ...req.body,
        };
        console.log(req.body);
        res.sendStatus(204);
    });
    // Delete a quiz
    app.delete("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        db.quizzes = db.quizzes.filter((m) => m._id !== qid);
        res.sendStatus(200);
    });
    // Read all questions for a quiz
    app.get("/api/quizzes/:quizId/questions", (req, res) => {
        const quizId = req.params.quizId;
        const quiz = db.quizzes.find((q) => q._id === quizId);
        const questions = quiz.questions.filter((q) => q.quizId === quizId);
        res.send(questions);
    });
    // Create a new question
    app.post("/api/quizzes/:quizId/questions", (req, res) => {
        const quizId = req.params.quizId;
        const quiz = db.quizzes.find((q) => q._id === quizId);
        const question = {
            ...req.body,
            _id: Date.now().toString(),
            quizId: quizId,
        };
        quiz.questions.push(question);
        res.send(question);
    });
    // Update a question
    app.put("/api/quizzes/:quizId/questions/:qid", (req, res) => {
        const quizId = req.params.quizId;
        const { qid } = req.params;
        const quiz = db.quizzes.find((q) => q._id === quizId);
        const questionIndex = quiz.questions.findIndex((q) => q._id === qid);
        quiz.questions[questionIndex] = {
            ...quiz.questions[questionIndex],
            ...req.body,
        };
        res.sendStatus(204);
    });
    // Delete a question
    app.delete("/api/quizzes/:quizId/questions/:qid", (req, res) => {
        const quizId = req.params.quizId;
        const { qid } = req.params;
        const quiz = db.quizzes.find((q) => q._id === quizId);
        quiz.questions = quiz.questions.filter((q) => q._id !== qid);
        res.sendStatus(200);
    });
}
