import './App.css';
import requests from './/Components/Requests';
import Row from './/Components/Row';
import Banner from './/Components/Banner';

function App() {
  return (
    <div className="app">
      <Banner/>
      <Row title="Netflix Originals" isLargeRow={true} fetchUrl={requests.fetchNetFlixOriginals}/>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
