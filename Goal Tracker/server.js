import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "goalmanager",
  password: "12302342556",
  port: 5433,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM goals ORDER BY id ASC");
    const goals = result.rows;
    const childResult = await db.query("SELECT * FROM child_goals ORDER BY id ASC");
    const childGoals = childResult.rows;
    console.log(goals);
    res.render("index.ejs", {
      goalItems: goals,
      childItems: childGoals,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const goalTitle = req.body.goalTitle;
  const goalDesc = req.body.goalDesc;
  const goalTime = req.body.goalTime;
  const goalPriority = req.body.goalPriority;
  try {
    await db.query("INSERT INTO goals (title, description, time, priority) VALUES ($1, $2, $3, $4)", [goalTitle, goalDesc, goalTime, goalPriority]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateprogress/:goalId", async(req, res) => {
  const goalProgress = req.body.goalProgress;
  const goalId = req.params.goalId;

  try {
    await db.query("UPDATE goals SET progress = ($1) WHERE id=($2)", [goalProgress, goalId]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const goalTitle = req.body.updatedgoalTitle;
  const id = req.body.updatedItemId;
  const goalDesc = req.body.updatedgoalDescription;
  const goalTime = req.body.updatedgoalTime;
  const goalPriority = req.body.updatedgoalPriority;
console.log(req.body);
  try {
    await db.query("UPDATE goals SET title = $1, description = $2, time = $3, priority = $4 WHERE id = $5", [goalTitle, goalDesc, goalTime, goalPriority, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM child_goals WHERE parent_goal_id = $1", [id]);
    await db.query("DELETE FROM goals WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/breakdown", async (req, res) => {
  console.log(req.body);
  const parentId = req.body.parentId;
  const childTitle = req.body.childTitle;
  const childTime = req.body.childTime;
  const childPriority = req.body.childPriority;
  try {
    await db.query("INSERT INTO child_goals (parent_goal_id, title, priority, time) VALUES ($1, $2, $3, $4)", [parentId, childTitle, childPriority, childTime]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/updatechildprogress/:goalId", async(req, res) => {
  const goalProgress = req.body.childProgress;
  const goalId = req.params.goalId;

  try {
    await db.query("UPDATE child_goals SET progress = ($1) WHERE id=($2)", [goalProgress, goalId]);
    res.redirect("/");
  } catch(err) {
    console.log(err);
  }
});

app.post("/editChildGoal", async (req, res) => {
  const goalTitle = req.body.updatedChildGoalTitle;
  const id = req.body.updatedItemId;
  const goalPriority = req.body.updatedChildGoalPriority;
console.log(req.body);
  try {
    await db.query("UPDATE child_goals SET title = $1, priority = $2 WHERE id = $3", [goalTitle, goalPriority, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});


app.post("/deleteChildGoal", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM child_goals WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});