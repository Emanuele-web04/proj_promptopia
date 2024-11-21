"use client";

import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-6 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return allPosts.filter(
      (p) =>
        regex.test(p.prompt) ||
        regex.test(p.creator.username) ||
        regex.test(p.tag)
    );
  };

  // il timeout serve per creare debouncing
  // in questo caso la searchbar non aggiorna subito ogni volta che viene inserito un carattere -> troppi ricalcoli
  // quindi gli metti un timeout di 500 secondi, quindi dopo che passano 500 secondi esegui il filtro
  const handleSearchChange = (e) => {
    //ogni carattere inserito cancella il timeout
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const filterByTag = (tagName) => {
    return allPosts.filter((p) => p.tag === tagName);
  };

  const clearSearchText = () => {
    setSearchText("");
  };

  const handleTagClick = (tagName) => {
    clearTimeout(searchTimeout);
    setSearchText(tagName);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterByTag(tagName);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <div className="flex relative w-full flex-col items-end space-y-5">
        <form className="w-full">
          <SearchBar value={searchText} onChange={handleSearchChange} />
        </form>
        {searchText && (
          <div className="flex flex-row px-3 py-2 ring-1 ring-gray-700 rounded-full gap-2 cursor-pointer"  onClick={clearSearchText}>
            <img
              src="/assets/icons/close.svg"
              alt=""
              height={15}
              width={15}
              className="text-white"
            />
            <p className="text-sm text-gray-700 ">Clear Search</p>
          </div>
        )}
      </div>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
