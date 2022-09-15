import "./App.scss";
import EditQuote from "./components/EditQuote.js";
import CreateQuote from "./components/CreateQuote.js";
import { useState, useEffect } from "react";
import DisplayQuote from "./components/DisplayQuote.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./denwa-logo300.webp";
import axios from "axios";
import fallbackData from "./data/fallbackData.json";

const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const PortfolioLink = "https://d5732.github.io/";

async function getData() {
  try {
    const result = await axios.get(url);
    return result.data.quotes;
  } catch {
    return fallbackData.quotes;
  }
}
function random(a) {
  return Math.floor(Math.random() * a.length);
}
function enumerateQuotes(data) {
  return data.map((item, id) => ({
    id: id,
    quote: item.quote,
    author: item.author,
  }));
}

export function animateButton(id) {
  document.getElementById(id).style.transform = "scale(0.9, 0.9)";
  setTimeout(
    () => (document.getElementById(id).style.transform = "scale(1)"),
    200
  );
}

function App() {
  const [quotesData, updateQuotesData] = useState();
  const [quote, updateQuote] = useState({ quote: "", author: "" });
  const [previousData, updatePreviousData] = useState();
  const [currentPage, updateCurrentPage] = useState(1);
  const [showPage, updateShowPage] = useState(false);
  const [fetchingStatus, updateFetchingStatus] = useState(0);
  const [animationClassName, setAnimationClassName] = useState("fade-in");

  useEffect(() => {
    getData()
      .then((result) => {
        updateQuotesData(enumerateQuotes(result));
        return enumerateQuotes(result);
      })
      .then((enumeratedResult) => {
        let r = random(enumeratedResult);
        updateQuote(enumeratedResult[r]);
        updatePreviousData([enumeratedResult[r]]);
        updateFetchingStatus(1);
      })
      .catch((error) => alert(error));
  }, []);

  // function logMyState() {
  //   console.log(
  //     "quotesData",
  //     quotesData,
  //     "quote",
  //     quote,
  //     "previousData",
  //     previousData,
  //     "currentPage",
  //     currentPage,
  //     "showPage",
  //     showPage
  //   );
  // }

  return (
    <Router basename="/random-quote-generator/">
      <div className="App">
        <div className="App-wrapper">
          <header className="header">
            <div className="header-chunk">
              <a href={PortfolioLink}>
                <img src={logo} className="logo" alt="Denwa.dev" />
              </a>
            </div>
            <nav>
              <ul>
                <li className="primary-home">
                  <Link to="/">Home</Link>
                </li>
                <li className="primary-create">
                  <Link to="/create">Create</Link>
                </li>
                <li className="primary-edit">
                  <Link to="/edit">Edit</Link>
                </li>
                <li>
                  <a href={PortfolioLink}>Back</a>
                </li>
              </ul>
            </nav>
          </header>

          <Switch>
            <Route exact path="/">
              <DisplayQuote
                quotesData={quotesData}
                quote={quote}
                previousData={previousData}
                currentPage={currentPage}
                showPage={showPage}
                updateQuote={updateQuote}
                updatePreviousData={updatePreviousData}
                updateCurrentPage={updateCurrentPage}
                updateShowPage={updateShowPage}
                random={random}
                animationClassName={animationClassName}
                setAnimationClassName={setAnimationClassName}
              />
            </Route>
            <Route path="/create">
              <CreateQuote
                quotesData={quotesData}
                updateQuotesData={updateQuotesData}
                updateQuote={updateQuote}
                updatePreviousData={updatePreviousData}
                animationClassName={animationClassName}
                setAnimationClassName={setAnimationClassName}
              />
            </Route>
            <Route path="/edit">
              <EditQuote
                quote={quote}
                previousData={previousData}
                key={fetchingStatus}
                quotesData={quotesData}
                updateQuotesData={updateQuotesData}
                updateQuote={updateQuote}
                updatePreviousData={updatePreviousData}
                animationClassName={animationClassName}
                setAnimationClassName={setAnimationClassName}
              />
            </Route>
          </Switch>
          {/* <button onClick={() => logMyState()}>Log state to console</button> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
