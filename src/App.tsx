import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

export function App() {
  const [isOpenNewTransaction, setIsOpenNewTransaction] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsOpenNewTransaction(true);
  }

  function handleCloseNewTransactionModal() {
    setIsOpenNewTransaction(false);
  }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isOpenNewTransaction}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </>
  );
}
