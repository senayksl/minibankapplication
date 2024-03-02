import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions');
                setTransactions(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch transactions.');
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.date}: {transaction.sourceAccount} to {transaction.destinationAccount} - ${transaction.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionHistory;
