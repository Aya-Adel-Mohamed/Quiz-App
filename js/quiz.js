export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.numOfQuestions = questions.length;
        this.score = 0;
        this.numberOfQuestionsElement = document.getElementById("numberOfQuestions");
        this.categoryElement = document.getElementById("category");
        this.difficultyElement = document.getElementsByName("difficulty");
        this.currentQuestion = 0;
        document.getElementById("next").addEventListener("click", this.nextQuestion.bind(this));
        $("#tryBtn").click(() => {
            $("#finish").fadeOut(500, () => {
                $("#setting").fadeIn(500);
                $('#setting').addClass('d-flex');

                $('#finish').removeClass('d-flex');
                this.numberOfQuestionsElement.value = '';
                this.categoryElement.value = $("select").prop("selectedIndex", 0).val();
                this.difficultyElement.value = Array.from(this.difficultyElement).filter((el) => {
                    return el
                })[0].value
            })
            this.questions = [];

            Array.from(this.difficultyElement).filter((el) => {
                return el.checked = false
            })
            $('#easy').prop('checked', true);
        })
        this.showQuestion();
    }


    shuffle(array) {
        let currentIndex = array.length, 
            randomIndex;
        while (currentIndex != 0) 
        {
            randomIndex = Math.floor(Math.random() * currentIndex); 
            currentIndex--; 
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    showQuestion() {
        document.getElementById("question").innerHTML = this.questions[this.currentQuestion].question;
        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1;
        document.getElementById("totalNumberOfQuestions").innerHTML = this.numOfQuestions;
        let answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers];
        this.shuffle(answers);
        let answerRow = "";
        for (let i = 0; i < answers.length; i++) {
            answerRow += `<label class="form-check-label">
            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}" style="height:18px; width:18px; vertical-align: middle;" >
            ${answers[i]}
        </label> <br/>`
        }
        document.getElementById("rowAnswer").innerHTML = answerRow;
    }

    nextQuestion() {
        if (Array.from(document.getElementsByName("answer")).filter(el => el.checked).length != 0) {
            $("#alert").fadeOut(500);
            let useranswer = Array.from(document.getElementsByName("answer")).filter(el => el.checked)[0].value;
            let correctAnswer = this.questions[this.currentQuestion].correct_answer;
            this.checkUserAnswer(correctAnswer, useranswer);
            this.currentQuestion++;
            if (this.numOfQuestions > this.currentQuestion) {
                this.showQuestion();
            } else {
                $("#score").text(this.score);
                $("#quiz").fadeOut(500, () => {
                    $("#finish").fadeIn(500);
                    $("#finish").addClass('d-flex');
                    $('#quiz').removeClass('d-flex');
                })
            }
        } else {
            $("#alert").fadeIn(500);
        }
    }

    checkUserAnswer(correctAnswer, userAnswer) {
        if (correctAnswer == userAnswer) {
            this.score++;

            $("#Correct").fadeIn(500).fadeOut(500);
        } else {
            $("#inCorrect").fadeIn(500).fadeOut(500);
        }
    }
}