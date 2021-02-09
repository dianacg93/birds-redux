import './App.css';
import {useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {incrementBird, addBird} from './store/birds/birds'

function App() {
  const [birdName, setBirdName] = useState("");
  const birds = [...useSelector(state => state.birds)].sort((a,b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addBird(birdName))
    setBirdName('');
  }
  
  return (
    <div className="wrapper">
      <h1>Bird List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Add Bird</p>
          <input type="text" 
          onChange={e => setBirdName(e.target.value)}
          value={birdName}
          />
        </label>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <ul>
        {birds.map(bird => (
          <li key={bird.name}>
            <h3>{bird.name}</h3>
            <div>
              Views: {bird.views}  
              <button
                onClick={() => dispatch(incrementBird(bird.name))}
              ><span role="img" aria-label="add">  +</span></button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
