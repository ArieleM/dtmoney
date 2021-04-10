import {
  createContext, useEffect, useState, ReactNode, useContext,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}
// Pega todos os campos e retira alguns
// type NewTransaction = Omit<Transaction, "id" | "createdAt">

// Pega somente os campos listados
type NewTransaction = Pick<Transaction, "title" | "amount" | "type" | "category">

interface TransationProviderProps {
  children: ReactNode; // Qualquer conteúdo valido para o React
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: NewTransaction) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export function TransactionsProvider({ children }: TransationProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: NewTransaction) {
    const response = await api.post("/transactions",
      { ...transactionInput, createdAt: new Date() });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    // Retorna um objeto
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
