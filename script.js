const wrapper = document.querySelector(".wrapper");//wrapper
const searchInput = wrapper.querySelector("input");
const synonyms = wrapper.querySelector(".synonyms .list");
const infoText = wrapper.querySelector(".info-text");
const volumeIcon = wrapper.querySelector(".word i");
const removeIcon = wrapper.querySelector(".search span");
var audio;


window.onload = searchInput.focus();
//we have 5

//data function
function data(result, word) {
    if (result.title) { //if api returns the message of can't find word
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>.Please, try to search for another word.`;
    } else {
        console.log(result);
        wrapper.classList.add("active");
        let arry = result[0].meanings;
        let lastElement = arry[arry.length - 1];
        console.log(lastElement);
        let definitions = lastElement.definitions[0];
        let phonetics = `${lastElement.partOfSpeech}  ${result[0].phonetics[0].text}`;

        //let's pass the particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;//hello
        document.querySelector(".word span").innerText = phonetics;//adjective/hapi
        document.querySelector(".meaning span").innerText = definitions.definition;//Having a feeling 
        document.querySelector(".example span").innerText = definitions.example;//example
        audio = new Audio(result[0].phonetics[0].audio);//creating new audio obj and passing audio src

        console.log(audio);

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
//fetch api function
function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // APi returns an object of searched word
    //fetching api reponse and returning it with parsing into js obj and in another then
    //method callinng data function with passing api response and searched word as an argument
    // fetch(url).then(res => res.json()).then(result => console.log(result));
    fetch(url).then(res => res.json()).then(result => data(result, word));

}


//search dictionary api
// https://dictionaryapi.dev/

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
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