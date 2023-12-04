/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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
   * Добавить товар в корзину
   * @param code
   */
  addItemToCart(code) {
    const itemInCart = this.state.cart.find(i => i.code === code);
    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(i => {
          if (i.code === code) {
            return {
              ...i,
              count: i.count + 1
            }
          } else {
            return i;
          }
        })
      })
    } else {
      const itemInList = this.state.list.find(i => i.code === code);
      this.setState({
        ...this.state,
        cart: [ ...this.state.cart, { ...itemInList, count: 1 }]
      })
    }
    this.#calcCartCost();
  };

  /**
   * Удалить товар из корзины
   * @param code
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(i => i.code !== code)
    });
    this.#calcCartCost();
  }

  /**
   * Подсчет общей стоимости корзины
   */
  #calcCartCost() {
    const isCartFull = this.state.cart.length > 0;
    if (isCartFull) {
      const cost = this.state.cart.reduce((a, b) => {return a + b.price * b.count}, 0);
      this.setState({
        ...this.state,
        cost
      });
    }
  }
}

export default Store;
