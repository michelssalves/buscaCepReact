import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import axios from "axios";

function App() {
  const[input, setInput] = useState('');
  const[cep, setCep] = useState({})

  async function handleSerach(){
    
    if(input === ''){
      alert('Preencha algum CEP')
      return
    }

    try{

      const response = await axios.get(`https://viacep.com.br/ws/${input}/json`);
 
      setCep(response.data);
      
    }catch{

      alert("Esse cep não existe!")
      setInput("")

    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div  className="containerInput">
          <input onChange={(e)=> setInput(e.target.value)}value={input} type="text" placeholder="Digite seu cep..."/>
          <button onClick={handleSerach} className="buttonSearch">
          <FiSearch size={25} color='#FFF'/>
          </button>
      </div>
      {Object.keys(cep).length > 0 && (

        <main className='main'>
          <h2>Cep: {cep.cep}</h2>
          <span>Estado:{cep.uf}</span>
          <span>Cidade:{cep.localidade}</span>
          <span>Bairro:{cep.bairro}</span>
          <span>Rua:{cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
        </main>

      )}

    </div>
  );
}

export default App;
