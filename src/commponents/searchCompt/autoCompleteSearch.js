import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import { Col } from "react-bootstrap";

/**
 * Auto Complete Search Box
 * @param {autoSugestMainClass, codeClass, options, fName, fId } props
 * options Data List
 */

const AutoCompleteSearch = (props) => {
  const [searchKey, setSearchKey] = useState("");
  const [localSugegestions, setLocalSugegestions] = useState([]);
  const sugOptions = [];
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setLocalSugegestions(props.options);
  }, []);

  const searchSuggesionUsinKey = (value) => {
    props.options
      .filter(
        ({ name, iataCode }) =>
          name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 ||
          iataCode.indexOf(searchKey) > -1
      )
      .map((item, i) => {
        sugOptions.push(item);
      });

    return sugOptions;
  };

  const renderSuggestion = (suggestion, { query }) => {

    const suggestionText = `${suggestion.name}, `;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={"suggestion-content "}>
        <span className="name">
          {parts.map((part, index) => {
            const className = part.highlight ? "highlight" : null;

            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
          <span className={props.codeClass}>{` ${suggestion.iataCode}`}</span>
        </span>
      </span>
    );
  };

  return (
    <React.Fragment>
      <div className={props.autoSugestMainClass}>
        <Autosuggest
          inputProps={{
            placeholder: `${props.pHolder}`,
            autoComplete: "4298248",
            name: `${props.fName}`,
            id: `${props.fId}`,
            value: searchKey,
            onChange: (e, { newValue }) => {
              setSearchKey(newValue);
            },
          }}
          suggestions={localSugegestions}
          onSuggestionsFetchRequested={async ({ value }) => {
            if (!value) {
              setLocalSugegestions([]);
              return;
            }

            setLocalSugegestions(searchSuggesionUsinKey(value));
            return;
          }}
          onSuggestionsClearRequested={() => {
            setLocalSugegestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={(e, { suggestion, method }) => {
            if (method === "enter") {
              e.preventDefault();
            }

            setSelectedValue(suggestion);
            props.getSelectedItem(suggestion);
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default AutoCompleteSearch;
