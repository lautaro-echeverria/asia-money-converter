import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import logo from './Images/logoApp32.png'; 
import 'animate.css';

function App() {

  const [valueMoneda, setValueMoneda] = useState('AED');
  const [valueMonto, setValueMonto] = useState('');
  const [valueResultadoUSD, setValueResultadoUSD] = useState('$ 0.00');
  const [valueResultadoARS, setValueResultadoARS] = useState('$ 0.00');
  const [valueUSDARS, setValueUSDARS] = useState(0);

  const API_key = '1c965822d824566017ea2525';
  const API_URL_USD = `https://v6.exchangerate-api.com/v6/${API_key}/latest/USD`;
  const API_URL_PESOS = 'https://api.bluelytics.com.ar/v2/latest';
  let currenciesValues = {};

  const fetchData = () => {
    axios.get(API_URL_USD, {
      cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    })
      .then(response => {
        currenciesValues['AED'] = response.data.conversion_rates['AED'];
        currenciesValues['THB'] = response.data.conversion_rates['THB'];
        currenciesValues['MYR'] = response.data.conversion_rates['MYR'];
        currenciesValues['SGD'] = response.data.conversion_rates['SGD'];

        if (valueMoneda === 'AED') {
          setValueResultadoUSD(`$ ${(valueMonto / currenciesValues['AED']).toFixed(2)}`);
          setValueResultadoARS(`$ ${(valueMonto / currenciesValues['AED'] * valueUSDARS).toFixed(2)}`);
        }
        if (valueMoneda === 'THB') {
          setValueResultadoUSD(`$ ${(valueMonto / currenciesValues['THB']).toFixed(2)}`);
          setValueResultadoARS(`$ ${(valueMonto / currenciesValues['THB'] * valueUSDARS).toFixed(2)}`);
        }
        if (valueMoneda === 'MYR') {
          setValueResultadoUSD(`$ ${(valueMonto / currenciesValues['MYR']).toFixed(2)}`);
          setValueResultadoARS(`$ ${(valueMonto / currenciesValues['MYR'] * valueUSDARS).toFixed(2)}`);
        }
        if (valueMoneda === 'SGD') {
          setValueResultadoUSD(`$ ${(valueMonto / currenciesValues['SGD']).toFixed(2)}`);
          setValueResultadoARS(`$ ${(valueMonto / currenciesValues['SGD'] * valueUSDARS).toFixed(2)}`);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    axios.get(API_URL_PESOS)
      .then(response => {
        setValueUSDARS(response.data.blue.value_avg)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className='title'>
          <img src={logo} alt='icon'></img>
          <p className='animate__animated animate__flipInX'>Money Converter</p>
          <img src={logo} alt='icon'></img>
        </div>
        <hr style={{width: '70%'}}></hr>
        <div className='inputs'>
          <div id='divMonto' className='input-group'>
            <input type='number' className='form-control' id='inputMonto' value={valueMonto} placeholder='Ingresar monto' onChange={e => setValueMonto(e.target.value)}></input>
            <select id='selectMoneda' className='form-select' onChange={e => setValueMoneda(e.target.value)}>
              <option value="AED">AED - Emiratos</option>
              <option value="THB">THB - Tailandia</option>
              <option value="MYR">MYR - Malasia</option>
              <option value="SGD">SGD - Singapur</option>
            </select>
          </div>
          <br></br>
          <button className='btn btn-success' onClick={fetchData}>Convertir</button>
          <br></br><br></br>
          <hr style={{width: '100%'}}></hr>
          <br></br>
          <div id='divUSD' className='row justify-content-center'>
            <div className='col-2 mt-1'><label>USD: &nbsp;</label></div>
            <div className='col-8'><input id='inputResultadoUSD' className='form-control' value={valueResultadoUSD} disabled style={{textAlign: 'center'}}></input></div>
          </div>
          <div id='divARS' className='row justify-content-center'>
            <div className='col-2 mt-1'><label>ARS: &nbsp;</label></div>
            <div className='col-8'><input id='inputResultadoPESOS' className='form-control' value={valueResultadoARS} disabled style={{textAlign: 'center'}}></input></div>
          </div>
        </div>
        <p className='footer'>© created by Lautaro Echeverria 2023</p>
      </header>
    </div>
  );
}

export default App;