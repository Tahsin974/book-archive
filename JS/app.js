const toggleSpinner = displayStyle =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = displayStyle;
}

const toggleResult = visibilityStyle => {
    const result = document.getElementById('result-area');
    result.style.visibility = visibilityStyle;
}
const toggleError = displayStyle => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = displayStyle;
}
const searchButton = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner('block');
    if(searchText === ''){
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent=''
        const h1 = document.createElement('h1')
        h1.classList.add('fw-bold');
        h1.classList.add('text-dark');
        h1.classList.add('text-center');
        h1.innerText = '!!!Please write something to display!!!';
        errorMessage.appendChild(h1)
        toggleSpinner('none');
        toggleError('block');
        toggleResult('hidden');

    }
    else{
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.docs,searchText));
    toggleError('none');
    }
    searchField.value = ''
    
}
const displayResult = (books,searchText)=> {
    
    const resultArea = document.getElementById('result-area')
    resultArea.textContent = '';

    if(books === null){
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent= '';
        errorMessage.innerHTML =`
        <h1 class = "fw-bold text-dark text-center">'${searchText}' result not found</h1>`;
        toggleSpinner('none');
        toggleResult('hidden');
    }
    else{
        books.forEach(book => {
            const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            console.log(url)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <div class = "p-2">
                    <img src="${url}" class="card-img-top" alt="book cover image">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title py-4 fw-bold">${book.title ? book.title : 'unknown'}</h5>
                      <small class="py-3"><span class = "fw-bold">author-name:</span> ${book.author_name}</small>
                      <p class="py-3"><span class = "fw-bold">publisher:</span> ${book.publisher[0] ? book.publisher[0] : 'unknown'}</p>
                      <p > <span class = "fw-bold">first-published:</span> ${book.first_publish_year ? book.first_publish_year : 'unknown'}</p>
                    </div>
                </div>`;
            resultArea.appendChild(div)
            toggleSpinner('none');
            toggleError('none');
        })
    }
    
}