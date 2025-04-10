import { Injectable } from '@nestjs/common';
import Author from 'src/models/Author';

@Injectable()
export class AuthorService {

    async createAuthor(data) {
        const { author_name } = data;

        const existingAuthor = await Author.findOne({ where: { author_name } });

        if (existingAuthor) {
            console.error('Author is already exist');
        }

        const newAuthor = await Author.create(data);
        return newAuthor;
    }

    async getAuthors() {
        const authors = await Author.findAll();
        return authors;
    }

    async getAuthorById(author_id) {
        const author = await Author.findOne({ where: { author_id: author_id } });
        if (author) {
            return author;
        } else {
            console.error('No author found');
        }
    }

    async updateAuthor(id, updatedFields) {
        const author = await Author.findOne({ where: { author_id: id } });
        if (!author) {
            console.error('Author does not exist');
        }
        const [effectedRows] = await Author.update(updatedFields, { where: { author_id: id } });

        if (effectedRows === 0) {
            console.error('Failed to update author');
        }
        return await Author.findOne({ where: { author_id: id } });
    }
}
