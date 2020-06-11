import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (!['income', 'outcome'].includes(type.toLowerCase())) {
      throw Error('This operation do not exists');
    }

    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balances');
    }

    const balance = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return balance;
  }
}

export default CreateTransactionService;
