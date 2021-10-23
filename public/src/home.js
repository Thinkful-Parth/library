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
      ? //initialize with 1
        (genreObj[book.genre] = 1)
      : // or just add 1 to its counter if it does exist
        (genreObj[book.genre] += 1)
  );
  let sorted = Object.entries(genreObj).sort((a, b) => b[1] - a[1]); //get values of how many times genres appear in books and sort  to get the most common

  return sorted
    .splice(0, 5) // only take the 5 most common
    .map((element) => ({ name: element[0], count: element[1] })); // fix the return to make sure it works with webpage
}

function getMostPopularBooks(books) {
  //initialize array
  
  let popular = books.reduce((acc,book) =>  {
    acc.push({ name: book.title, count: book.borrows.length });
    //push every book with and how many borrows it has
    return acc;
  },[]
  );
  //sort and only return the top 5 most common
  return popular.sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  //helper function
  const fullName = (author) => {
    return author.name.first + " " + author.name.last;
  };

  //get back an Object of authors with the amount of time someone borrowed their book
  let popularAuthor = authors.reduce((acc, author) => {
    //map through book to get borrow length
    books.map((book) => {
      //if book matches author
      if (author.id == book.authorId) {        
        // if accumulator from reduce does not have this object key yet
        if (!acc[fullName(author)]) {
          //initialize key with current borrow length
          acc[fullName(author)] = book.borrows.length;
        } else {
          //add borrow length to existing key
          acc[fullName(author)] += book.borrows.length;
        }
      }
    });
    //return reducer accumulator outside of book map arrow function
    return acc;
  }, []);

  return Object.entries(popularAuthor) //go through reducer output
    .sort((a, b) => (a[1] < b[1] ? 1 : -1)) //sort to get most borrowed
    .slice(0, 5) // only want the first 5
    .map((author) => ({ name: author[0], count: author[1] })); // formatting for webpage
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
