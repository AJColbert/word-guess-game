var gamecategory = {
    retrogames: ["DONKEYKONG", "ICECLIMBERS", "MARIO", "PACMAN", "TETRIS", "DOOM", "ZELDA", "SONIC", "SPACEINVADERS", "PAPERBOY", "CONTRA", "METRIOD", "ASTERIODS", "DEFENDER",
        "DUCKHUNT", "CIVILIZATION", "MEGAMAN", "FROGGER", "FINALFANTASY", "SPYRO", "DIABLO", "TEKKEN", "STARFOX", "GAUNTLET"]

};

var categoryword;
var currentword;
var guessedletters;
var guesscount;
var wincount;

// SetWins done in html
NewWord()
//Reset Wins
wincount = 0;
document.getElementById("wins").innerHTML = wincount;

function NewWord()
{
    //Get Random Word from Category
    categoryword = GetWord();
    //Set Current word Blanks
    currentword = GetCurrentWord_Blanks(categoryword);
    //Clear Guessed letter String and htmml
    guessedletters = "";
    document.getElementById("lettersguessed").innerHTML = guessedletters;
    //Set Guess counter and display in html
    guesscount = 12;
    document.getElementById("remainingguesses").innerHTML = guesscount;

}

// Listen for key press - on keyup 
document.onkeyup = function (event)
{

    // Determines which key was pressed.
    var userGuess = event.key;
    userGuess = userGuess.toUpperCase();
    var guessed = PreviouslyGuessed(currentword, userGuess);
    var restrict = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    //Restrict to only allow character input
    if (restrict.includes(userGuess))
    {
        //Check if already guessed
        if (!guessed)
        {
            if (categoryword.includes(userGuess))
            {
                //Update Current Word
                currentword = CurrentWord(categoryword, userGuess);
                if (currentword == categoryword)
                {
                    //Increase Wins
                    wincount += 1;
                    document.getElementById("wins").innerHTML = wincount;
                    //Get new word and reset
                    NewWord();
                }
            }
            else
            {
                //Update letters guessed and guess counter
                WrongGuess(userGuess);

                if (guesscount == 0)//move to out side of guessed
                {
                    //Game Over No more guesses
                }
            }
        }
    }
};

//Get the Random word from user to guess
function GetWord()
{
    var length = gamecategory.retrogames.length;
    var randomindex = Math.floor(Math.random() * Math.floor(length));
    var word = gamecategory.retrogames[randomindex]
    return word;
}

//Initialize Current Word string with Blanks
function GetCurrentWord_Blanks(word)
{
    var wordlength = word.length;
    var blanks = "";
    for (i = 0; i < wordlength; i++)
    {
        blanks = blanks + "_";
    }
    document.getElementById("currentword").innerHTML = blanks;
    return blanks;
}

//Get and Update the Current Word the user is guessing
function CurrentWord(word, guess)
{
    var wordlength = word.length;
    var wordstring = "";
    for (i = 0; i < wordlength; i++)
    {
        var char = word.charAt(i);
        var curchar = currentword.charAt(i);

        if (guess === char)
        {
            wordstring = wordstring + char;

        }
        else
        {
            if (curchar != "_")
            {
                wordstring = wordstring + curchar;
            }
            else
            {
                wordstring = wordstring + "_";
            }
        }
    }
    document.getElementById("currentword").innerHTML = wordstring;
    return wordstring;
}

function PreviouslyGuessed(currentword, guess)
{
    //Check if letter has been guessed already
    var n = currentword.includes(guess);
    var x = guessedletters.includes(guess);

    if (!n && !x)// If doesn't exists in current word or previous guesses then return false to continue
    {
        return false;
    }
    else
    {
        return true;
    }
}

function WrongGuess(guess)
{
    // guesscount = parseInt(document.getElementById("remainingguesses").value);//I think just use guess count variable should be enough html grab not needed

    if (guesscount != 0)
    {
        //decrease guess count
        guesscount -= 1;
        document.getElementById("remainingguesses").innerHTML = guesscount;

        //Add letter to previously guessed letters string and display
        guessedletters = guessedletters + guess + ",";
        document.getElementById("lettersguessed").innerHTML = guessedletters;
    }
}



