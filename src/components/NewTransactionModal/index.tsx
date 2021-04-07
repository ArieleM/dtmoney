import Modal from "react-modal";
import { useState } from "react";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

interface NewTransactionModal {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModal) {
  const [typeTransaction, setTypeTransaction] = useState("deposit");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <h2>Cadastrar transação</h2>
        <input placeholder="Título" />
        <input placeholder="Valor" type="number" />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={typeTransaction === "deposit"}
            onClick={() => { setTypeTransaction("deposit"); }}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={typeTransaction === "withdraw"}
            onClick={() => { setTypeTransaction("withdraw"); }}
            activeColor="red"

          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input placeholder="Categoria" />
        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>

  );
}