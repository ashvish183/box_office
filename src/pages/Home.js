import React, { useCallback, useState } from "react";
import ActorGrid from "../components/actors/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/shows/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from "./Home.styled";

const renderResults = (results) => {
  if (results && results.length === 0) {
    return <div>No results</div>;
  }

  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }

  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setOption] = useState("shows");
  const isShows = searchOption === "shows";
  const onInputChange = useCallback((event) => {
    setInput(event.target.value);
  },[setInput])
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
    });
  };
  const onEnter = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = useCallback((ev) => {
    setOption(ev.target.value);
  },[])
  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={onInputChange}
        value={input}
        onKeyDown={onEnter}
        placeholder="Search for Something"
      />
      <RadioInputsWrapper>
        <div>
            <CustomRadio
                label='Shows'
                id="shows-search"
                value="shows"
                checked={isShows}
                onChange={onRadioChange}
            />
        </div>
        <div>
            <CustomRadio
                label='Actors'
                id="actors-search"
                value="people"
                checked={!isShows}
                onChange={onRadioChange}
            />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      </SearchButtonWrapper>
      <div>{renderResults(results)}</div>
    </MainPageLayout>
  );
};

export default Home;
