import { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { animateButton } from "../App.js";

function haveSameData(obj1, obj2) {
  if (!obj1 || !obj2) {
    console.log("haveSameData failed, obj1, obj2: ", obj1, obj2);
    return false;
  }
  const obj1Length = Object.keys(obj1).length;
  const obj2Length = Object.keys(obj2).length;

  if (obj1Length === obj2Length) {
    return Object.keys(obj1).every(
      (key) => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]
    );
  }
  return false;
}

export default function EditQuote(props) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onQuickFilterChanged = () => {
    gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  };
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };
  const onRemoveSelected = () => {
    const selectedRowData = gridApi.getSelectedRows();
    gridApi.applyTransaction({ remove: selectedRowData });
    let ids = [];
    selectedRowData.forEach((item) => ids.push(item.id));

    if (ids.includes(props.quote.id)) {
      props.updateQuote({ quote: "", author: "" });
    }
    const filteredQuotesData = props.quotesData.filter(
      (item) => !ids.includes(item.id)
    );
    const filteredPreviousData = props.previousData.filter(
      (item) => !ids.includes(item.id)
    );
    if (!haveSameData(props.quotesData, filteredQuotesData)) {
      props.updateQuotesData(filteredQuotesData);
      animateButton("delete-selected");
    }
    if (!haveSameData(props.previousData, filteredPreviousData)) {
      props.updatePreviousData(filteredPreviousData);
    }
  };

  function isFirstColumn(params) {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  return (
    <div className="component-container">
      <h2>Edit Quote</h2>
      <div className="description">
        <ul style={{ listStyle: "none" }}>
          <li>
            To edit a quote, click on a field in the table below. To save your
            edit, press ENTER or click on another field.
          </li>
          <li>
            To delete a quote, select a tickbox to the left, then press the
            'delete selected rows' button below.
          </li>
        </ul>
      </div>
      <div className="before-grid">
        <input
          type="text"
          onInput={() => onQuickFilterChanged()}
          id="quickFilter"
          placeholder="Quick filter..."
        />
      </div>
      <div id="edit-grid" className="ag-theme-alpine-dark">
        <AgGridReact
          defaultColDef={{
            flex: 1,
            minWidth: 49,
            resizable: true,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
          }}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          rowSelection={"multiple"}
          rowData={props.quotesData}
        >
          <AgGridColumn
            headerName="ID"
            field="id"
            maxWidth={"62"}
          ></AgGridColumn>
          <AgGridColumn
            field="quote"
            minWidth={"500"}
            editable={true}
            singleClickEdit={true}
          ></AgGridColumn>
          <AgGridColumn
            field="author"
            minWidth={"135"}
            maxWidth={"185"}
            editable={true}
            singleClickEdit={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>

      <div>
        <button id="delete-selected" onClick={() => onRemoveSelected()}>
          Delete selected rows
        </button>
      </div>
    </div>
  );
}
