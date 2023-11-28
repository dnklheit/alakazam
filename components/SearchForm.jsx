"use client";
import React from "react";
import Image from "next/image";
import LoadingSpinner from "@/app/loading";
import { BASE_URI } from "@/utils/helpers";
import { beautify } from "@/utils/helpers";

const SearchForm = () => {
  const [keyword, setKeyword] = React.useState("");
  const [searchResult, setSearchResult] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchResult(null);
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URI}/pokemon/${keyword}`);
      setSearchResult(await response.json());
    } catch (err) {
      setSearchResult(
        `We couldn't find any results matching "${keyword}". Try a different query.`
      );
      console.error(err);
    }

    setLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 font-bangers">
          Discover Pokémon
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <input
            className="flex-grow text-base text-gray-800 bg-gray-100 outline-none p-2"
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a Pokémon name..."
            required
          />
          <button
            type="submit"
            className="text-base px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-yellow-200 transition duration-300 font-bangers"
          >
            Search
          </button>
        </form>
      </div>

      {searchResult && (
        <div className="flex flex-col items-center mt-8 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-200 p-6 rounded-md shadow-md">
          {typeof searchResult === "object" ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 uppercase text-gray-800 font-bangers">
                {searchResult.name}
              </h2>
              <div className="flex justify-center mb-4">
                <Image
                  src={searchResult?.sprites?.front_default}
                  height={150}
                  width={150}
                  alt="pokemon image"
                  className="rounded-md"
                />
              </div>
              <div className="flex justify-center aig mt-6 text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-xl font-semibold">
                    <p className="mb-1 text-gray-800 font-bangers">Type</p>
                    <p className="text-base">
                      {beautify(searchResult.types[0]?.type?.name)}
                    </p>
                  </div>
                  <div className="text-xl font-semibold">
                    <p className="mb-1 text-gray-800 font-bangers">Height</p>
                    <p className="text-base">{searchResult.height * 10} cm</p>
                  </div>
                  <div className="text-xl font-semibold">
                    <p className="mb-1 text-gray-800 font-bangers">Weight</p>
                    <p className="text-base">{searchResult.weight} kg</p>
                  </div>
                  <div className="text-xl font-semibold">
                    <p className="mb-1 text-gray-800 font-bangers">ID</p>
                    <p className="text-base">{searchResult.id}</p>
                  </div>
                  <div className="text-xl font-semibold">
                    <p className="mb-1 text-gray-800 font-bangers">Base Experience</p>
                    <p className="text-base">{searchResult.base_experience}</p>
                  </div>
                  <div className="text-xl font-semibold">
                    <p className="mb-1 text-gray-800 font-bangers">Abilities</p>
                    <ul className="list-disc pl-5">
                      {searchResult.abilities?.map((item, index) => (
                        <li
                          key={index}
                          className="text-base text-gray-800"
                        >
                          {beautify(item.ability?.name)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            typeof searchResult === "string" && (
              <p className="text-red-500 mt-4">{searchResult}</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
