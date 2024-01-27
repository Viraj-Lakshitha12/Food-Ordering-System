import { model, Schema, Document, Model, Aggregate } from 'mongoose';
import moment from 'moment';

interface OrderItem {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

interface OrderDocument extends Document {
    items: OrderItem[];
    total: number;
    email: string;
    createdAt: string;
}

interface OrderModel extends Model<OrderDocument> {
    calculateIncomeByInterval(interval: string): Promise<{ total: number }>;
    calculateIncomeForLastNDays(days: number): Promise<{ date: string; total: number }[]>;
}

const orderSchema = new Schema({
    items: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    email: { type: String, required: true },
    createdAt: { type: String, default: moment().format('YYYY-MM-DD HH:mm') }
});

// Pre-save hook to format the current date/time before saving
orderSchema.pre('save', function (next) {
    this.createdAt = moment().format('YYYY-MM-DD HH:mm');
    next();
});

// Static method to calculate income based on the specified interval
orderSchema.statics.calculateIncomeByInterval = async function (interval: string): Promise<{ total: number }> {
    try {
        const match: any = {};
        const now = moment();

        switch (interval) {
            case 'daily':
                match.createdAt = {
                    $gte: moment(now).startOf('day').toISOString(),
                    $lte: moment(now).endOf('day').toISOString()
                };
                break;
            case 'weekly':
                match.createdAt = {
                    $gte: moment(now).startOf('week').toISOString(),
                    $lte: moment(now).endOf('week').toISOString()
                };
                break;
            // Add more cases as needed (monthly, yearly, etc.)
            default:
                break;
        }

        const result: { _id: null; totalIncome: number }[] = await this.aggregate([
            {
                $match: match
            },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: '$total' }
                }
            }
        ]);

        // Extract total income from the result
        const totalIncome = result.length > 0 ? result[0].totalIncome : 0;

        return { total: totalIncome };
    } catch (error) {
        console.error('Error calculating income:', error);
        throw error;
    }
};

// Static method to calculate income for the last N days
orderSchema.statics.calculateIncomeForLastNDays = async function (days: number): Promise<{ date: string; total: number }[]> {
    try {
        const incomes: { date: string; total: number }[] = [];

        for (let i = 0; i < days; i++) {
            const currentDate = moment().subtract(i, 'days');
            const match = {
                createdAt: {
                    $gte: currentDate.startOf('day').toISOString(),
                    $lte: currentDate.endOf('day').toISOString()
                }
            };

            const result: { _id: null; totalIncome: number }[] = await this.aggregate([
                {
                    $match: match
                },
                {
                    $group: {
                        _id: null,
                        totalIncome: { $sum: '$total' }
                    }
                }
            ]);

            const totalIncome = result.length > 0 ? result[0].totalIncome : 0;
            incomes.push({ date: currentDate.format('YYYY-MM-DD'), total: totalIncome });
        }

        return incomes;
    } catch (error) {
        console.error('Error calculating income for last N days:', error);
        throw error;
    }
};

export const OrderModel = model<OrderDocument, OrderModel>('orders', orderSchema);
