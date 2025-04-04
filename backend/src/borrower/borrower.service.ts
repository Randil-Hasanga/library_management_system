import { Injectable } from '@nestjs/common';
import Borrower from 'src/models/Borrower';

@Injectable()
export class BorrowerService {
    async createBorrower(data) {
        const { NIC } = data;
        const existing_borrower = await Borrower.findOne({ where: { NIC } });
        if (existing_borrower) {
            console.error('Borrower with this NIC already exist');
        }
        const new_borrower = await Borrower.create(data);
        return new_borrower;
    }

    async getBorrowers() {
        const borrowers = await Borrower.findAll();
        if (!borrowers) {
            console.error('No borrower found');
        }
        return borrowers;
    }

    async getBorrowerById(id) {
        const borrower = await Borrower.findOne({ where: { borrower_id: id } });
        if (!borrower) {
            console.error('Borrower not found');
        }
        return borrower;
    }

    async updateBorrower (id, updatedData)  {
        const existing_borrower = await Borrower.findOne({ where: { borrower_id: id } });
        if (!existing_borrower) {
            console.error('Borrower not found');
        }
        const [effectedRows] = await Borrower.update(updatedData, { where: { borrower_id: id } });
        if (effectedRows === 0) {
            console.error('Failed to update borrower');
        }
        return effectedRows;
    }

    async deleteOrRestoreBorrower (id, isActive)  {
        const existing_borrower = await Borrower.findOne({ where: { borrower_id: id } });
        if (!existing_borrower) {
            console.error('Borrower not found');
        }
        const [effectedRows] = await Borrower.update(isActive, { where: { borrower_id: id } });
        if (effectedRows === 0) {
            console.error('Failed to update borrower');
        }
        return effectedRows;
    }
}
