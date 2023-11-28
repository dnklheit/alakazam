import { BASE_URI } from '@/utils/helpers';
import Image from 'next/image';
import { beautify } from '@/utils/helpers';

async function fetchPokemonList() {
  const totalPokemonCount = 1292;
  const offset = Math.floor(Math.random() * totalPokemonCount) + 1;
  const limit = 10;

  try {
    const response = await fetch(`${BASE_URI}/pokemon?offset=${offset}&limit=${limit}`, {
      next: {
        revalidate: 60,
      },
    });

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function fetchPokemonData(pokemonList) {
  const promises = pokemonList?.map(async (pokemon) => {
    const response = await fetch(pokemon.url, {
      next: {
        revalidate: 60,
      },
    });

    return await response.json();
  });

  return await Promise.all(promises);
}

const TopPokemon = async () => {
  const { results } = await fetchPokemonList();
  const pokemon = await fetchPokemonData(results);

  return (
    <>
      <h1 className="text-2xl font-bangers text-center my-10">Top Pokémon</h1>

      {pokemon ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="font-bangers bg-gray-200">
              <th className="border border-gray-400"></th>
              <th className="border border-gray-400 text-gray-800 text-xl">Name</th>
              <th className="border border-gray-400 text-gray-800 text-xl">Abilities</th>
            </tr>
          </thead>
          <tbody>
            {pokemon?.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-300'}>
                <td className="border border-gray-400 p-2">
                  <Image
                    src={item.sprites?.front_default}
                    height={150}
                    width={150}
                    alt={item.name}
                  />
                </td>
                <td className="border border-gray-400 p-2 text-base">{beautify(item.name)}</td>
                <td className="border border-gray-400 p-2 text-base">
                  <ul>
                    {item.abilities?.map((abl, index) => (
                      <li key={index}>{beautify(abl.ability?.name)}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found</p>
      )}
    </>
  );
};

export default TopPokemon;
