function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //intialize Counter
  let count = 0;
//for each book
  books.map((book) => {
    //for each borrow
    book.borrows.map((borrow) => {
      //if borrow is not yet returned, add 1 to counter
      borrow.returned == false && count++;
    });
  });

  return count;
}
function getMostCommonGenres(books) {
  //intitlize return variable
  let genreObj = {};
  //for each book
  books.forEach((book) =>
  //if genre not yet in object
    !genreObj[book.genre]
    //initialize with 1
      ? (genreObj[book.genre] = 1)
      // or just add 1 to its counter if it does exist
      : (genreObj[book.genre] += 1)
  );
  let sorted = Object.entries(genreObj).sort((a, b) => b[1] - a[1]); //get values of how many times genres appear in books and sort  to get the most common

  return sorted
    .splice(0, 5) // only take the 5 most common
    .map((element) => ({ name: element[0], count: element[1] })); // fix the return to make sure it works with webpage
}

function getMostPopularBooks(books) {
  let popular = [];
  books.map((book) =>
    popular.push({ name: book.title, count: book.borrows.length })
  );

  return popular.sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let popularAuthor = {};
  const fullName = (author) => {
    return author.name.first + " " + author.name.last;
  };
  const addCount = (author, book) => {
    if (!popularAuthor[fullName(author)]) {
      popularAuthor[fullName(author)] = book.borrows.length || 0;
    } else {
      popularAuthor[fullName(author)] += book.borrows.length || 0;
    }
  };
  books.map((book) =>
    authors.map((author) => {
      author.id == book.authorId && addCount(author, book);
    })
  );
  let favorites = Object.entries(popularAuthor)
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .slice(0, 5)
    .map((author) => ({ name: author[0], count: author[1] }));
  return favorites;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
