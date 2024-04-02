import courses from "../Database/courses.js";
import db from "../Database/index.js";

export default function Courses(app) {
    // CRUD
    // Read all courses
    app.get("/api/courses", (req, res) => {
        res.send(db.courses);
    });
    // Read one course by id
    app.get("/api/courses/:id", (req, res) => {
        const id = req.params.id;
        const course = db.courses.find((c) => c._id === id);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.send(course);
    });
    // Create a new course
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body, _id: Date.now().toString() };
        db.courses.push(course);
        res.send(courses);
    });
    // Delete a course
    app.delete("/api/courses/:id", (req, res) => {
        const id = req.params.id;
        const courseIndex = db.courses.findIndex((c) => c._id === id);
        if (courseIndex === -1) {
            return res.status(404).send("Course not found");
        }
        db.courses.splice(courseIndex, 1);
        res.send(db.courses);
    });
    // Update a course
    app.put("/api/courses/:id", (req, res) => {
        const id = req.params.id;
        const courseIndex = db.courses.findIndex((c) => c._id === id);
        if (courseIndex === -1) {
            return res.status(404).send("Course not found");
        }
        const updatedCourse = { ...db.courses[courseIndex], ...req.body };
        db.courses[courseIndex] = updatedCourse;
        res.send(updatedCourse);
    });
}
