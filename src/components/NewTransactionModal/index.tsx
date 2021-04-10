import Modal from "react-modal";
import { FormEvent, useState } from "react";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { api } from "../../services/api";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

interface NewTransactionModal {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModal) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);
  const [typeTransaction, setTypeTransaction] = useState("deposit");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      value,
      typeTransaction,
      category,
    };

    api.post("/transactions", data);
  }
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
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título"
          value={title}
        />
        <input
          onChange={(event) => setValue(Number(event.target.value))}
          placeholder="Valor"
          type="number"
          value={value}
        />
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
        <input
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Categoria"
          value={category}
        />
        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>

  );
}
