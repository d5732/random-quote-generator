import { useState } from "react";
import { animateButton } from "../App.js";

export default function CreateQuote(props) {
  const [authorInput, updateAuthorInput] = useState();
  const [quoteInput, updateQuoteInput] = useState();

  function getNewUniqueId() {
    if (props.quotesData.length !== 0) {
      return props.quotesData[props.quotesData.length - 1].id * 1 + 1;
    } else {
      return 0;
    }
  }

  function submitCreateQuote() {
    console.log("SUBMIT CREATE QUOTE ACTION");
    if (quoteInput && authorInput) {
      let id = getNewUniqueId();
      let copy = [...props.quotesData];
      console.log(
        "id",
        id,
        "authorInput",
        authorInput,
        "quoteInput",
        quoteInput
      );
      props.updateQuotesData([
        ...copy,
        { id: id, quote: quoteInput, author: authorInput },
      ]);
      updateQuoteInput("");
      updateAuthorInput("");
      document.getElementById("create-quote").value = "";
      document.getElementById("create-author").value = "";
      animateButton("submit-create-quote");
    } else {
      alert(
        "Submit failed! Make sure to complete the 'quote' and 'author' fields before submitting."
      );
    }
  }

  return (
    <div className="component-container">
      <h2>Create Quote</h2>
      <div className="description">
        Use the form below to add a new quote to the library.
      </div>
      <div className="form-container">
        <div className="form-input-wrapper">
          <label className="form-label" htmlFor="create-quote">
            Quote:{" "}
          </label>
          <input
            id="create-quote"
            onChange={(e) => updateQuoteInput(e.target.value)}
          ></input>
          <label className="form-label" htmlFor="create-author">
            Author:{" "}
          </label>
          <input
            id="create-author"
            onChange={(e) => updateAuthorInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitCreateQuote();
              }
            }}
          ></input>
        </div>
      </div>

      <button
        id="submit-create-quote"
        onClick={() => {
          submitCreateQuote();
        }}
      >
        Submit
      </button>
    </div>
  );
}
