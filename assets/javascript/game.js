var gamecategory = {
    retrogames: {"DONKEYKONG":"assets/images/donkeykong.png", "MARIO":"assets/images/mario.jpg", "PACMAN":"assets/images/pacman.png",
     "TETRIS":"assets/images/tetris.png", "DOOM":"assets/images/doom.jpg", "ZELDA":"assets/images/zelda.jpg", "SONIC":"assets/images/sonic.png",
      "SPACEINVADERS":"assets/images/spaceinvaders.jpg", "PAPERBOY":"assets/images/paperboy.png", "CONTRA":"assets/images/contra.jpg",
       "METRIOD":"assets/images/metroid.jpg", "ASTERIODS":"assets/images/asteriods.jpg", "DEFENDER":"assets/images/defender.png",
       "DUCKHUNT":"assets/images/duckhunt", "CIVILIZATION":"assets/images/civilizations.png", "MEGAMAN":"assets/images/megaman.jpg", "FROGGER":"frogger.jpg",
        "FINALFANTASY":"assets/images/finalfantasy.png", "SPYRO":"assets/images/spyro.jpg", "DIABLO":"assets/images/diablo.png", "TEKKEN":"assets/images/tekken.jpg", 
        "STARFOX":"assets/images/starfox.jpg", "GAUNTLET":"assets/images/gauntlet.jpg"}

};

var categoryword;
var currentword;
var guessedletters;
var guesscount;
var wincount;
var gameover = false;

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
    guesscount = 10;
    document.getElementById("remainingguesses").innerHTML = guesscount;

}

// Listen for key press - on keyup 
document.onkeyup = function (event)
{

    if (!gameover)
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
                        //Set new image
                        document.getElementById("image").setAttribute("src", gamecategory.retrogames[currentword]);
                        document.getElementById("image").setAttribute("style", "display: block");
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
                        GameOver();
                    }
                }
            }
        }
    }
};

//Get the Random word from user to guess
function GetWord()
{
    var length = Object.keys(gamecategory.retrogames).length;
    var randomindex = Math.floor(Math.random() * Math.floor(length));
    var word = Object.keys(gamecategory.retrogames)[randomindex];
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

function GameOver()
{
    gameover = true;

    var a = "Game Over -- Refresh the page to start a new game";
    document.getElementById("extra-col-p").innerHTML = a;

}

