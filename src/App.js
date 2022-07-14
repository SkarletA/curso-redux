import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Col } from 'antd';
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import logo from './statics/logo.svg'
import './App.css';
import { getPokemon } from './api';
import { setPokemons as setPokemonActions} from './actions';

function App({ pokemons, setPokemons }) {
  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonRes = await getPokemon();
      setPokemons(pokemonRes);
    }
    fetchPokemons();
  }, [])
  return (
    <div className="App">
      <Col span={6} offset={10}>
        <img src={logo} alt="Pokedux"/>
      </Col>
      <Col span={8} offset={8}>
        <Search />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});
const mapDispatchToProps = (dispatch) => ({
  setPokemons: (value) => dispatch(setPokemonActions(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
