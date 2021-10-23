function findAccountById(accounts, id) {
  return accounts.filter((account) => account.id == id)[0];
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
}

function getTotalNumberOfBorrows(account, books) {
  //intialize counter
  let count = 0;
  books.reduce((acc, book) =>
    book.borrows.map((borrow) => borrow.id == account.id && count++)
  );
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  //intialize array to hold objects
  let booksPossessed = [];
  //dig through all 3 sets to find all that pass
  books.map((book) => {
    book.borrows.filter((borrow) => {
      authors.find((author) => {
        //these parameters
        borrow.id == account.id &&
          borrow.returned == false &&
          author.id == book.authorId &&
          //if all passes, pass the modified object to array

          booksPossessed.push({ ...book, author });
      });
    });
  });
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
