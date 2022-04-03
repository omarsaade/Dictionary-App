const wrapper = document.querySelector(".wrapper");//wrapper
const searchInput = wrapper.querySelector("input");//input
const synonyms = wrapper.querySelector(".synonyms .list");//list li byenzal fia synonyms
const infoText = wrapper.querySelector(".info-text");//current status
const volumeIcon = wrapper.querySelector(".word i");//volume play
const removeIcon = wrapper.querySelector(".search span");// el close
var audio;//audio


window.onload = searchInput.focus();//focus on load
//we have 5 editable


// 3-Data function
function data(result, word) {
    if (result.title) { //if api returns the message of can't find word
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>.Please, try to search for another word.`;
        console.log(result);
    } else {
        console.log(result);
        wrapper.classList.add("active");//display block and change the opacity

        let arry = result[0].meanings;//a5adna el meanings kellon
        let lastElement = arry[arry.length - 1];//3tine e5er menaingzeye
        console.log(lastElement);//last one
        let definitions = lastElement.definitions[0];//Get first defintion // array
        let phonetics = `${lastElement.partOfSpeech}  ${result[0].phonetics[1].text}`;//adjetive/hapi


        //let's pass the particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;//happy
        document.querySelector(".word span").innerText = phonetics;//adjective/hapi
        document.querySelector(".meaning span").innerText = definitions.definition;//Having a feeling 
        document.querySelector(".example span").innerText = definitions.example;//example
        audio = new Audio(result[0].phonetics[0].audio);//creating new audio obj and passing audio src

        console.log(audio);//https://sdjdhjdhj.com

        if (definitions.synonyms[0] == "") { //if there is no synonym then hide the synonyms div
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 5; i++) {//getting only 5 synonyms out of many
                let tag = `<span onclick=search('${lastElement.synonyms[i]}')>${lastElement.synonyms[i]},</span>`;//synonyms
                synonyms.insertAdjacentHTML("beforeend", tag);//passing all 5 synonyms inside synonyms div
                // element.insertAdjacentHTML(position, text);
                //yaane hetele el tag 2abel teskiret el taggg
            }

        }

    }
}





//seach synonyms function
function search(word) {

    searchInput.value = word;
    fetchApi(word);
}










//          <!-- beforebegin -->

//          <p>
//             <!-- afterbegin -->
//             foo
//             <!-- beforeend -->
//          </p>

//          <!-- afterend -->










//search dictionary api
// https://dictionaryapi.dev/
//2-fetch api function
function fetchApi(word) {
    wrapper.classList.remove("active");// display none
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // APi returns an object of searched word
    //fetching api reponse and returning it with parsing into js obj and in another then
    //method callinng data function with passing api response and searched word as an argument
    // fetch(url).then(res => res.json()).then(result => console.log(result));
    fetch(url).then(res => res.json()).then(result => data(result, word));

}


//1-search dictionary api
// https://dictionaryapi.dev/

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) { //if enter is clicked and event is true
        fetchApi(e.target.value);//shaggel el method hayde
    }
})



volumeIcon.addEventListener("click", () => {
    audio.play();
})



removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "9a9a9a";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";

});