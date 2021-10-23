function findAuthorById(authors, id) {
  return authors.filter((author) => author.id == id)[0];
}

function findBookById(books, id) {
  return books.filter((book) => book.id == id)[0] || null;
}

function partitionBooksByBorrowedStatus(books) {
  let returned = []; // for holding books that made it back
  let checkedout = []; // for holding books that are not in the facility

  books.map((book) => {
    book.borrows[0].returned == true
      ? //the 0th index borrow is always the last borrow.
        returned.push(book) //so if it returns true then book is here.
      : checkedout.push(book); //if false its not in the facilty
  });
  return [checkedout, returned];
}

function getBorrowersForBook(book, accounts) {
  //intialize empty Array
  let borrowersAccounts = [];
  //iterate through borrowers
  book.borrows.map((borrower) => {
    //destructure object to implement in return
    let { id, returned } = borrower;
    accounts.map((account) => {
      //checking current account id  to current borrow id, if all is well push modified object
      account.id == id && borrowersAccounts.push({ ...account,returned });
    });
  });
  return borrowersAccounts.slice(0, 10); // 10 or less in the result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
