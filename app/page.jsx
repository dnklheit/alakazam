import React from "react";
import SearchForm from "@/components/SearchForm";
import TopPokemon from "@/components/TopPokemon";

const page = () => {
  return (
    <>
      <div id='home' className='flex flex-col items-center justify-center'>
      <section className="search-section">
        <SearchForm />
      </section>
      <section className="random-section">
        <TopPokemon />
      </section>
      </div>
    </>
  );
};

export default page;
