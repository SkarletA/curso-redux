import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { connect } from 'react-redux';
import { Col, Spin } from 'antd';
import Search from './components/Search';
import PokemonList from './components/PokemonList';
import { getPokemon } from './api';
import { getPokemonsWithDetails, setloading } from './actions';
import logo from './statics/logo.svg'
import './App.css';


function App() {
  const pokemons = useSelector((state) => state.getIn(['data', 'pokemons'], shallowEqual)).toJS();
  const loading = useSelector((state) => state.get(['ui', 'loading']));
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPokemons = async () => {
      dispatch(setloading(true));
      const pokemonRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonRes));
      dispatch(setloading(false));
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
      {loading ? (
        <Col offset={12}>
          <Spin spinning size="large" />
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
}
// const mapStateToProps = (state) => ({
//   pokemons: state.pokemons,
// });
// const mapDispatchToProps = (dispatch) => ({
//   setPokemons: (value) => dispatch(setPokemonActions(value)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
