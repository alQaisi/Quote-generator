const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader=document.getElementById('loader');

const showLoadingSpinner=()=>{
    loader.hidden=false;
    quoteContainer.hidden=true;
}
const removeLoadingSpinner=()=>{
    if(!loader.hidden){
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
}

const getQuote=async ()=>{
    showLoadingSpinner();
    const proxyUrl='https://salty-woodland-36841.herokuapp.com/'
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response=await fetch(proxyUrl+apiUrl);
        const data=await response.json();
        if(data.quoteAuthor===''){
            authorText.innerText='Unkown';
        }else{
            authorText.innerText=data.quoteAuthor;
        }
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText=data.quoteText;
        removeLoadingSpinner();
    }catch(error){
        getQuote();
    }
}

const tweetQuote=()=>{
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuote();
