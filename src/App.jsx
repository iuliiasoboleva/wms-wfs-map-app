import React from 'react';
import MapComponent from './components/MapComponent';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WMS/WFS Map Application</h1>
        <p>Кликните на объект карты для просмотра атрибутов</p>
      </header>
      <main>
        <MapComponent />
      </main>
    </div>
  );
}

export default App;