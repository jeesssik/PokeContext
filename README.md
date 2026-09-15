# Pokédex con React Context

Aplicación web que permite buscar Pokémon por nombre o por ID usando la API pública de [PokéAPI](https://pokeapi.co/). La interfaz está inspirada en una Pokédex clásica y muestra la imagen, los tipos, los datos básicos y las estadísticas del Pokémon seleccionado.

## Tecnologías

- React
- React Context API
- Axios
- React Scripts
- PokéAPI

## Instalación y ejecución

Instalar las dependencias:

```bash
npm install
```

Iniciar el proyecto en modo desarrollo:

```bash
npm start
```

Crear una versión optimizada para producción:

```bash
npm run build
```

## ¿Cómo funciona el Contexto?

El Contexto de React permite compartir información entre componentes sin tener que pasar datos mediante `props` en cada nivel del árbol de componentes.

La estructura principal es:

```text
App
└── PokemonProvider
		└── PokemonDetails
				└── usePokemon()
```

### `PokemonContext.js`

En [PokemonContext.js](src/PokemonContext.js) se crea el contexto:

```javascript
const PokemonContext = createContext();
```

Luego, `PokemonProvider` mantiene los estados compartidos:

```javascript
const [pokemonData, setPokemonData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [currentQuery, setCurrentQuery] = useState('skitty');
```

Estos estados representan:

- `pokemonData`: información del Pokémon recibida desde la API.
- `isLoading`: indica si hay una búsqueda en curso.
- `errorMessage`: almacena el mensaje cuando la búsqueda falla.
- `currentQuery`: nombre o ID de la última búsqueda.

El proveedor comparte los estados y funciones mediante `value`:

```javascript
const value = {
	pokemonData,
	isLoading,
	errorMessage,
	currentQuery,
	setCurrentQuery,
	fetchPokemonData,
};
```

Finalmente, los componentes hijos reciben esos valores:

```javascript
<PokemonContext.Provider value={value}>
	{children}
</PokemonContext.Provider>
```

### `usePokemon`

El hook personalizado simplifica el acceso al contexto:

```javascript
export function usePokemon() {
	return useContext(PokemonContext);
}
```

De esta manera, cualquier componente ubicado dentro de `PokemonProvider` puede utilizar los datos compartidos llamando a `usePokemon()`.

## Flujo de una búsqueda

En [PokemonDetails.js](src/PokemonDetails.js), el componente obtiene los valores del contexto:

```javascript
const {
	pokemonData,
	isLoading,
	errorMessage,
	currentQuery,
	setCurrentQuery,
	fetchPokemonData,
} = usePokemon();
```

Cuando el usuario envía el formulario:

1. Se evita el comportamiento predeterminado del formulario.
2. Se limpia y normaliza el texto ingresado.
3. Se actualiza `currentQuery`.
4. Se ejecuta `fetchPokemonData(query)`.
5. El contexto activa `isLoading`.
6. Axios consulta `https://pokeapi.co/api/v2/pokemon/{query}`.
7. La respuesta se guarda en `pokemonData`.
8. Si ocurre un error, se actualiza `errorMessage`.
9. La interfaz se vuelve a renderizar con el nuevo estado.

## Estructura principal

```text
src/
├── App.js              # Estructura general de la Pokédex
├── App.css             # Estilos de la carcasa y la pantalla
├── PokemonContext.js   # Contexto, estados y consulta a la API
├── PokemonDetails.js   # Buscador y datos del Pokémon
├── index.js             # Punto de entrada de React
└── index.css            # Estilos globales
```

## API utilizada

La aplicación utiliza el endpoint de Pokémon:

```text
GET https://pokeapi.co/api/v2/pokemon/{nombre-o-id}
```

Ejemplos:

```text
https://pokeapi.co/api/v2/pokemon/pikachu
https://pokeapi.co/api/v2/pokemon/25
```
