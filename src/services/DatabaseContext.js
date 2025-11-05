import { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Categorías
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/categorias');
      setCategories(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (categoryData) => {
    try {
      setLoading(true);
      const { data } = await api.post('/categorias', categoryData);
      setCategories(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const { data } = await api.put(`/categorias/${id}`, updates);
      setCategories(prev => prev.map(cat => cat.id === id ? data : cat));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cuentas
  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cuentas');
      setAccounts(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAccount = useCallback(async (accountData) => {
    try {
      setLoading(true);
      const { data } = await api.post('/cuentas', accountData);
      setAccounts(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Transacciones
  const fetchTransactions = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const { data } = await api.get('/transacciones', { params });
      setTransactions(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (transactionData) => {
    try {
      setLoading(true);
      const { data } = await api.post('/transacciones', transactionData);
      setTransactions(prev => [data, ...prev]);
      // Actualizar saldo de la cuenta
      await fetchAccounts();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAccounts]);

  // Presupuestos
  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/presupuestos');
      setBudgets(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBudget = useCallback(async (id, updates) => {
    try {
      setLoading(true);
      const { data } = await api.put(`/presupuestos/${id}`, updates);
      setBudgets(prev => prev.map(budget => budget.id === id ? data : budget));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Estadísticas
  const getStatistics = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const { data } = await api.get('/estadisticas', { params });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    categories,
    accounts,
    transactions,
    budgets,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    fetchAccounts,
    createAccount,
    fetchTransactions,
    createTransaction,
    fetchBudgets,
    updateBudget,
    getStatistics,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase debe usarse dentro de un DatabaseProvider');
  }
  return context;
};