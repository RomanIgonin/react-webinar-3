import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import {calcCartCost} from "./utils";
import CartModal from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),
    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, [store]),
    onOpenCart: useCallback(() => {
      openModal();
    }, []),
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpenCart={openModal} productCount={cart.length} cost={calcCartCost(cart)}/>
      <List list={list} onClickButton={callbacks.onAddItemToCart} />
      <CartModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        list={cart}
        onClickRemoveItem={callbacks.onRemoveItemFromCart}
      />
    </PageLayout>
  );
}

export default App;
