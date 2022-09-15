import { animateButton } from "../App";

export default function DisplayQuote({
  quotesData,
  quote,
  previousData,
  currentPage,
  showPage,
  updateQuote,
  updatePreviousData,
  updateCurrentPage,
  updateShowPage,
  random,
  animationClassName,
  setAnimationClassName,
}) {
  function newQuote() {
    console.log("NEW QUOTE REQUEST");
    if (quotesData.length > 0) {
      let r = random(quotesData);
      let newQuote = quotesData[r];
      let copyPrevious = [...previousData, newQuote];
      let lastPage = currentPage;
      updateCurrentPage(lastPage + 1);
      updateQuote(newQuote);
      updatePreviousData(copyPrevious);
      updateShowPage(true);
      animateButton("display-quote-forward");
      console.log("quote", quote, "previousData", previousData);
    } else {
      updateCurrentPage(1);
      alert(
        "No quotes data available! Create one with the 'Create a new quote' menu"
      );
    }
  }
  function oldQuote() {
    console.log("OLD QUOTE REQUEST");
    if (previousData.length > 0) {
      let page = currentPage - 1;
      updateCurrentPage(page);
      let quoteToShow = previousData[page - 1];
      updateQuote(quoteToShow);
      animateButton("display-quote-back");
    } else {
      updateCurrentPage(1);
      alert(
        "No quotes data available! Create one with the 'Create a new quote' menu"
      );
    }
  }
  function nextQuote() {
    console.log("NEXT QUOTE REQUEST");
    if (previousData.length > 0) {
      let page = currentPage + 1;
      updateCurrentPage(page);
      let quoteToShow = previousData[page - 1];
      updateQuote(quoteToShow);
      animateButton("display-quote-forward");
    } else {
      alert(
        "No quotes data available! Create one with the 'Create a new quote' menu"
      );
    }
  }

  function handler(type) {
    console.log(
      70 +
        quotesData.reduce(function (a, b) {
          return a.quote.length <= b.quote.length ? a : b;
        }).quote
    );
    switch (type) {
      case "forward":
        previousData.length <= currentPage ? newQuote() : nextQuote();
        setAnimationClassName("fade-out");
        setTimeout(() => {
          console.log(74);
          setAnimationClassName("fade-in");
        }, 100);
        break;
      case "back":
        oldQuote();
        setAnimationClassName("fade-out");
        setTimeout(() => {
          setAnimationClassName("fade-in");
        }, 100);
        break;
      default:
        console.error(`Invalid handler type: ${type}`);
        break;
    }
  }

  return (
    <div className="component-container">
      <h2>Random Quote Generator</h2>
      <div className="description">
        Use the buttons below to generate another random quote or go back to a
        previous quote.
      </div>
      <div className={"quote-container " + animationClassName}>
        <i className="fas fa-quote-right fa-2x"></i>

        <div className="quote-text">
          {JSON.stringify(quote.quote).slice(1, -1)}
        </div>
        <br />
        <div>
          {quote.author
            ? "― " + JSON.stringify(quote.author).slice(1, -1).replace("–", "")
            : ""}
        </div>
      </div>
      <div>
        {currentPage > 1 ? (
          <button id="display-quote-back" onClick={() => handler("back")}>
            <i className="fas fa-angle-left fa-2x"></i>
          </button>
        ) : (
          <button
            style={{ visibility: "hidden" }}
            id="display-quote-back"
            onClick={() => handler("back")}
          >
            <i className="fas fa-angle-left fa-2x"></i>
          </button>
        )}
        <button id="display-quote-forward" onClick={() => handler("forward")}>
          <i className="fas fa-angle-right fa-2x"></i>
        </button>
      </div>
      {showPage ? <div className="page">Page {currentPage}</div> : ""}
    </div>
  );
}
