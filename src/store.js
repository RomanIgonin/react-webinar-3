/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.selectedItemCode = null;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const checkCodeDuplicate = (code) => {
      const isDuplicated = list.findIndex(i => i.code === code) >= 0;
      return isDuplicated ? checkCodeDuplicate(code + 1) : code;
    }

    const list = this.state.list;
    const maxCode = Math.max(...list.map(i => i.code), 0); // Найдем самый большой существующий код
    const newCode = checkCodeDuplicate(maxCode + 1);  // Прибавим еденицу и проверим на дубликаты

    this.setState({
      ...this.state,
      list: [...this.state.list, {code: newCode, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Записываем код выделенного элемента
   * @param code
   */
  setSelectItemCode(code) {
    this.selectedItemCode = code;
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаляем код выделенного элемента
   */
  removeSelectItemCode() {
    this.setSelectItemCode(null);
  }

  /**
   * Считаем сколько раз был выделен элемент
   * @param code
   */
  setCountItemSelection(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.countSelection) {
            item.countSelection++;
          } else {
            item.countSelection = 1;
          }
        }
        return item;
      })
    })
  }
}

export default Store;
