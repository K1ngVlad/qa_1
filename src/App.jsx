import { useRef, useState } from 'react';
import './App.css';
import { getData, getTableText } from './helpers';
import { TableColumn } from './components/TableColumn';

import pastIcon from './assets/past.svg';

function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const tableRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const currentData = getData(text);
    const { data, max, min } = currentData;
    setMax(max);
    setMin(min);
    setData(data);
  };

  const onResetHandler = () => {
    setText('');
    setData([]);
  };

  const onCopyHandler = () => {
    const elem = tableRef.current;

    if (elem && navigator && navigator.clipboard) {
      const text = getTableText(elem);
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('Таблица скопирована');
          alert('Таблица скопирована!');
        })
        .catch((err) => {
          console.log('Something went wrong', err);
          alert('Произошла ошибка при копировании таблицы!');
        });
    }
  };

  const onPastHandler = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard
        .readText()
        .then((text) => {
          setText(text.replace(/\n/g, ' '));
        })
        .catch((err) => {
          console.log('Произошла ошибка при вставке текста', err);
        });
    }
  };

  return (
    <main>
      <h1>Управление качеством. Задание 1</h1>
      <form
        className="form"
        onReset={onResetHandler}
        onSubmit={onSubmitHandler}
      >
        <label className="inputLabel">
          <p className="labelText">
            Скопируйте и вставьте сюда числа из таблицы
          </p>
          <div className="inputContainer">
            <input
              className="textInput"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="8.1 10.4 8.8 9.7 7.8 9.9 11.7 8.0 9.3 9.0 ..."
            />
            <button type="button" onClick={onPastHandler} className="pastBtn">
              <img className="pastIcon" alt="Вставить текст" src={pastIcon} />
            </button>
          </div>
        </label>
        <div className="buttons">
          <button className="submitBtn" type="submit">
            Рассчитать
          </button>
          <button className="clearBtn" type="reset">
            Очистить
          </button>
        </div>
      </form>
      <div className="values">
        <div className="value">
          <p>{`Максимальное значение: ${max}`}</p>
        </div>
        <div className="value rightValue">
          <p>{`Минимальное значение: ${min}`}</p>
        </div>
      </div>
      <div className="tableContainer">
        <table ref={tableRef} className="table">
          <thead>
            <tr>
              <th>Значение</th>
              <th>Частота</th>
              <th>Относительная частота</th>
              <th>Накопленная частота</th>
              <th>Относительная накопленная частота</th>
            </tr>
          </thead>
          <tbody>
            {data.map((colData, i) => (
              <TableColumn key={i} data={colData} />
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={onCopyHandler} className="copyBtn">
        Скопировать таблицу
      </button>
    </main>
  );
}

export default App;
