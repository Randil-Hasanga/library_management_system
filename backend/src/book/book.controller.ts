import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './book.dto';

@Controller('books')
export class BookController {

    constructor(private readonly bookService: BookService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createBook(@Body() bookData: BookDto, @Res() res) {
        try {
            const newBook = await this.bookService.createBook(bookData)
            res.status(201).json({ message: "Book inserted successfully", data: newBook });
        } catch (error) {
            res.status(501).json({ message: "Book insertion failed", error: error.message });
        }
    }

    @Get()
    async getBooks(@Res() res) {
        try {
            const books = await this.bookService.getBooks();
            res.status(201).json({ message: "Books retrieved successfully", data: books });
        } catch (error) {
            res.status(501).json({ message: "Books retrieval failed", error: error.message });
        }
    }

    @Get(':id')
    async getBookById(@Param('id') book_id, @Res() res) {
        try {
            const book = await this.bookService.getBookById(book_id);
            res.status(201).json({ message: "Book retrieved successfully", data: book });
        } catch (error) {
            res.status(501).json({ message: "Book retrieval failed", error: error.message });
        }
    }

    @Delete(':id')
    async deleteBook(@Param('id') book_id, @Res() res) {
        try {
            const effectedRows = await this.bookService.deleteBook(book_id);
            res.status(201).json({ message: "Book deleted successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Book deletion failed", error: error.message });
        }
    }

    @Get('deleted/all')
    async getDeletedBooks(@Res() res) {
        try {
            const deletedBooks = await this.bookService.getDeletedBooks();
            res.status(201).json({ message: "Deleted books retrieved successfully", data: deletedBooks });
        } catch (error) {
            res.status(501).json({ message: "Deleted books retrieval failed", error: error.message });
        }
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async updateBook(@Param('id') book_id, @Res() res, @Body() updatedBookData : BookDto) {
        try {
            const updatedBook = await this.bookService.updateBook(book_id, updatedBookData);
            res.status(201).json({ message: "Book updated successfully", effectedRows: updatedBook });
        } catch (error) {
            res.status(501).json({ message: "Book update failed", error: error.message });
        }
    }
}
