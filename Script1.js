const quizdata=[
{
    question: "How many hearts does an octopus have?",
    options: ['4' ,'3' ,'6' ,'2' ],
    answer: '3',
},
{
    question: "What country has the most islands?",
    options: ['Iceland' ,'Finland' ,'Norway' ,'Sweden' ],
    answer: 'Sweden',
},
{
    question: "What planet is closest to the sun?",
    options: ['Mercury' ,'Mars' ,'Venus' ,'Saturn' ],
    answer: 'Mercury',
},
{
    question: "What is acrophobia a fear of?",
    options: ['spiders' ,'flying' ,'heights' ,'insects' ],
    answer: 'flying',
},
{
    question: "Where is the strongest huamn muscle located?",
    options: ['shoulder' ,'jaw' ,'feet' ,'hip' ],
    answer: 'jaw',
},
{
    question: "Which is the only body part that is fully grown from birth?",
    options: ['kidneys' ,'liver' ,'eyes' ,'brain' ],
    answer: 'eyes',
},
{
    question: "In what country was Elon Musk born?",
    options: ['The United States' ,'Finland' ,'South Africa' ,'Canada' ],
    answer: 'South Africa',
},
];
const quizcontainer=document.getElementById('quiz');
const resultscontainer=document.getElementById('result');
const submitbutton=document.getElementById('submit');
const retrybutton=document.getElementById('retry');
const showanswerbutton=document.getElementById('showAnswer');

let currentquestion = 0;
let score = 0;
let incorrect = [];

function shuffle(array){
    for(let i =array.length -1 ; i > 0 ; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]]=[array[j],array[i]];
    }
}
function displayquestion(){
     const data= quizdata[currentquestion];

     const questionselement=document.createElement('div');
     questionselement.className='question';
     questionselement.innerHTML=data.question;

     const optionselement=document.createElement('div');
     optionselement.className='options';

     const shuffled= [...data.options];
     shuffle(shuffled);

    for(let i=0;i<shuffled.length;i++)
    {
        const option=document.createElement('label'); //why label
        option.className='option';

        const radio=document.createElement('input');
        radio.type='radio';
        radio.name='quiz';
        radio.value=shuffled[i]; //why give it a value ,

        const text=document.createTextNode(shuffled[i]);

        option.appendChild(radio);
        option.appendChild(text);
        optionselement.appendChild(option);
    }
    quizcontainer.innerHTML='';
    quizcontainer.appendChild(questionselement); //quiz container not results
    quizcontainer.appendChild(optionselement);

}
function check(){
    const selected=document.querySelector('input[name="quiz"]:checked');
    if(selected)
    {
        const answer=selected.value; 
        if(answer===quizdata[currentquestion].answer)
        {
            score++;
        }
        else{
            incorrect.push({
                question: quizdata[currentquestion].question,
                Yourchoice: answer,
                answer: quizdata[currentquestion].answer,
            });
        }
        currentquestion++;
        selected.checked=false; //reset?
        if(currentquestion<quizdata.length)
        {
            displayquestion();
        }
        else{
            displayresult();
        }
    }
}
function displayresult(){
    quizcontainer.style.display='none';
    if(score > (quizdata.length/2))
    {
    resultscontainer.innerHTML=`
    <p>Your score = ${score} out of ${quizdata.length}!</p><br>
    <p> You Win!  🎉<p>
    `;
    }
    else{
        resultscontainer.innerHTML=`
        <p>Your score = ${score} out of ${quizdata.length}!</p><br>
        <p> You lost, try again 😞<p>
        `;
    }
    submitbutton.style.display='none';
    retrybutton.style.display='inline-block';
    showanswerbutton.style.display='inline-block';
}

function retry(){
currentquestion=0;
score=0;
incorrect=[];
quizcontainer.style.display='block';
resultscontainer.innerHTML='';
submitbutton.style.display='inline-block';
retrybutton.style.display='none';
showanswerbutton.style.display='none';
displayquestion();
}

function showAnswer(){
    quizcontainer.style.display='none';
    submitbutton.style.display='none';
    retrybutton.style.display='inline-block';
    showanswerbutton.style.display='none';
    let incorrectarray='';
    for(let i=0;i<incorrect.length;i++)
    {
        incorrectarray=incorrectarray+ `
        <p>
        <strong>Question</strong> ${incorrect[i].question}<br>
        <strong>Yourchoice</strong> ${incorrect[i].Yourchoice}<br>
        <strong>answer</strong> ${incorrect[i].answer}
        </p>
        `;
    }
    resultscontainer.innerHTML=`
    <p>
    You scored ${score} out of ${quizdata.length}!
    </p>
    <p>
    Incorrect answers: </p>
    ${incorrectarray}
     `;
     //in p?
}

submitbutton.addEventListener('click', check);
retrybutton.addEventListener('click', retry);
showanswerbutton.addEventListener('click', showAnswer);

displayquestion();
//this function will be shown when the retry button is clicked, so reset everything
//have to call display again

//men called fen
//check calls display b3deha and display result
//have to call display initially
//submit should call check
// you display a question, check the answer, show answer fl akher, submit ,retry, show answer
//on submit u check answer, it's not a  function