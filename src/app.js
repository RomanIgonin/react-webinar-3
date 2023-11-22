import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const onClickItem = (code) => {
    if (code === store.selectedItemCode) {
      store.removeSelectItemCode();
    } else {
      store.setSelectItemCode(code);
      store.setCountItemSelection(code);
    }
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item => {
            const title = item.title + (item.countSelection ? ` | Выделяли ${item.countSelection} раз` : '');
            return (
              <div key={item.code} className='List-item'>
                <div className={'Item' + (item.code === store.selectedItemCode ? ' Item_selected' : '')}
                     onClick={() => onClickItem(item.code)}>
                  <div className='Item-code'>{item.code}</div>
                  <div className='Item-title'>{title}</div>
                  <div className='Item-actions'>
                    <button onClick={() => store.deleteItem(item.code)}>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
