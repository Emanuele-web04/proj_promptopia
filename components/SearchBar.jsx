import React from "react";

const SearchBar = ({ value, onChange }) => (
    <input
      type="text"
      className="search_input peer"
      required
      onChange={onChange}
      value={value}
      placeholder="Search for a prompt, tag or username"
    />
);

export default SearchBar;
