// This will import your function from petMatcher.js and call it with
// the data provided.
import "./styles.css";
import data from "./data.json";
import petMatcher from "./petMatcher";

document.getElementById("app").innerHTML = petMatcher(data);
