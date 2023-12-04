import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;
  const cost = store.getState().cost;

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),
    onOpenModal: useCallback(() => {
      setModalOpen(true);
    }, []),
    onCloseModal: useCallback(() => {
      setModalOpen(false);
    }, []),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenCart={callbacks.onOpenModal} productCount={cart.length} cost={cost} />
      <List list={list} onClickButton={callbacks.onAddItemToCart} />
      <Modal
        isModalOpen={isModalOpen}
        title={'Корзина'}
        buttonTitle={'Закрыть'}
        closeModal={callbacks.onCloseModal}
      >
        <Cart cart={cart} cost={cost} onClickRemoveItem={callbacks.onRemoveItemFromCart} />
      </Modal>
    </PageLayout>
  );
}

export default App;
