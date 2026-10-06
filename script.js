
const resultado = document.getElementById('resultado')
const campoBusca = document.getElementById('campoBusca')
const btnBuscar = document.getElementById('btnBuscar')
const btnAnterior = document.getElementById('btnAnterior')
const btnAleatorio = document.getElementById('btnAleatorio')
const btnProximo = document.getElementById('btnProximo')
var pokemonAtual = 1;
buscarPokemon(pokemonAtual)

//const resultado = fetch(url)
//                    .then(function (resultado) {
//                        return resultado.json()
//                    })
//                    .then(function(resultado){
//                        console.log(resultado)
//
//                   })

//forma compactada, usando arrow function                   
// const resposta = fetch(url)
//                    .then(resposta => resposta.json())
//                    .then(resposta => resultado.innerHTML = `
//                        <img src="${resposta.sprites.front_default}"/>
//                        <p>#${resposta.id}</p>
//                        <h2>${resposta.name}</h2>
//                    `)
// function buscarPokemon(termo){ 
//     const url = "https://pokeapi.co/api/v2/pokemon/" + termo
//     fetch(url)
//         .then(resposta => resposta.json())
//         .then(resposta => resultado.innerHTML = `
//             <img src="${resposta.sprites.front_default}"/>
//             <p>#${resposta.id}</p>
//             <h2>${resposta.name}</h2>
//         `)
// }

async function buscarPokemon(termo) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + termo
    const resposta = await fetch(url)
    if (resposta.ok) {
        const pokemon = await resposta.json() 

        pokemonAtual = pokemon.id
      const tipos = pokemon.types.map(tipo => tipo.type.name);

    const imagemAnimada =
    pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
    pokemon.sprites.front_default;
// https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png
resultado.innerHTML = `
    <div class="pokemon-card">

        <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, '0')}.png"/>

        <p>#${pokemon.id}</p>

        <h2>${pokemon.name}</h2>

        <div class="pokemon-tipos">
           ${tipos.map(tipo => `
          <span class="tipo ${tipo}">
          ${tiposPT[tipo]}
          </span>
         `).join("")}
        </div>

        <div class="pokemon-info">
            <p>Altura: ${pokemon.height / 10} m</p>
            <p>Peso: ${pokemon.weight / 10} kg</p>
        </div>

    </div>
`;
    } else {
        resultado.innerHTML = '<h2>Pokemon não encontrado<h2>'
    }


}
const tiposPT = { normal: "Normal", fire: "Fogo", water: "Água", electric: "Elétrico", grass: "Planta", ice: "Gelo", fighting: "Lutador", poison: "Veneno", ground: "Terrestre", flying: "Voador", psychic: "Psíquico", bug: "Inseto", rock: "Pedra", ghost: "Fantasma", dragon: "Dragão", dark: "Sombrio", steel: "Aço", fairy: "Fada" };

btnBuscar.addEventListener('click', () => {
    console.log("Fui clicado buscando pokemon " + campoBusca.value)
    pokemonAtual = campoBusca.value
    buscarPokemon(pokemonAtual)
  

});

campoBusca.addEventListener('keyup', evento => {
    if (evento.key == "Enter") {
        btnBuscar.click()
       

    }

})

btnAnterior.addEventListener('click', () => {
    if (pokemonAtual > 1) {
    console.log('buscando Pokemon anterior')
    pokemonAtual--
    buscarPokemon(pokemonAtual)
    }
})

btnProximo.addEventListener('click', () => {
    if (pokemonAtual < 1025) {
    console.log('buscando proximo Pokemon')
    pokemonAtual++

    buscarPokemon(pokemonAtual)
    }
})

btnAleatorio.addEventListener('click', () => {
    console.log('Buscando pokemon aleatorio')
    pokemonAtual = Math.floor(Math.random() * 1025) + 1

    buscarPokemon(pokemonAtual)

})




