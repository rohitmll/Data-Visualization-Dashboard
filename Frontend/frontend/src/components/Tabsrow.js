import React, { useState } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button, CardGroup } from "react-bootstrap";
import CardsForData from "./CardsForData";
import AccordionForCharts from "./AccordionForCharts";
import Filters from "./Filters";

const Tabsrow = ({ data, setMainData }) => {
  // state to store the number of data cards we want to display at a time, we'll update it on click of a button
  const [limit, setLimit] = useState(3);
  const limitedData = data.slice(0, limit);

  // state to store the search bar text
  const [search, setSearch] = useState("");

  /// function to make an api call to get the filtered data

  const handleSearchResult = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/data/any/${search}`
      );
      const responseData = await response.json();
      setMainData(responseData.data);
      setSearch("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="tabsClass">
      <Tabs
        defaultActiveKey="chart"
        id="fill-tab-example"
        className="mb-3"
        // justify
      >
        <Tab eventKey="chart" title="Interactive Insights/Dashboard">
          <form
            className="form-inline"
            onSubmit={handleSearchResult}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search by Sector Name, Topic, Title, Pestle, Source, Insight, URL..."
              aria-label="Search"
              name="Search"
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <Filters setMainData={setMainData} />
          <AccordionForCharts data={data} />
        </Tab>
        <Tab eventKey="data" title="Data">
          <form
            className="form-inline"
            onSubmit={handleSearchResult}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search by Sector Name, Topic, Title, Pestle, Source, Insight, URL..."
              aria-label="Search"
              name="Search"
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <Filters setMainData={setMainData} />

          {limitedData && limitedData.length === 0 ? (
            <div style={{ margin: "1rem" }}>
              No data found, or please wait for a while.
            </div>
          ) : limitedData && limitedData.length > 0 ? (
            <CardGroup>
              {limitedData.map((e, i) => {
                return <CardsForData item={e} key={i} />;
              })}
            </CardGroup>
          ) : (
            <div>Loading...</div>
          )}
          <Button
            variant="primary"
            onClick={() => setLimit((prev) => prev + 5)}
          >
            Show More
          </Button>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Tabsrow;
