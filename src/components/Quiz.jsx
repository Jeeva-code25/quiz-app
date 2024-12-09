
import './Quiz.css'
import { questions_data } from '../assets/question_data'
import { useRef, useState } from 'react'

const Quiz = () => {

    let [index, setIndex] = useState(0)
    let [lock, setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)


    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)


    const options_array = [option1, option2, option3, option4]

    return (
        <div className='body-container'>
            <div className="container">

                <h2>Quiz App</h2>
                <hr />
                {result ? <>
                <h5>Your scored {score} out of {questions_data.length}</h5>
                <button onClick={() => reset()}> Reset</button>
                </> : <>
                    <h4 className="question">{index + 1}. {questions_data[index].question}</h4>
                    <ul className="options">
                        <li ref={option1} onClick={(e) => { checkAnswer(e, 1) }}>{questions_data[index].option1}</li>
                        <li ref={option2} onClick={(e) => { checkAnswer(e, 2) }}>{questions_data[index].option2}</li>
                        <li ref={option3} onClick={(e) => { checkAnswer(e, 3) }}>{questions_data[index].option3}</li>
                        <li ref={option4} onClick={(e) => { checkAnswer(e, 4) }}>{questions_data[index].option4}</li>
                    </ul>
                    <button className="next-bt" onClick={() => nextQuestion()}>Next</button>
                    <p>{index + 1} of {questions_data.length} questions</p></>}


            </div>
        </div>
    )

    function checkAnswer(element, userAns) {
        if (!lock) {
            setLock(true)
            if (userAns == questions_data[index].ans) {
                element.target.classList.add("correct")
                setScore(prevScore => ++prevScore)
            } else {
                element.target.classList.add("wrong")
                options_array[questions_data[index].ans - 1].current.classList.add("correct")
            }
        }
    }
    function nextQuestion(params) {
        if (lock) {

            if (index < questions_data.length - 1) {
                setLock(false)
                setIndex(prevIndex => ++prevIndex)

                options_array.map(opt => {
                    opt.current.classList.remove("correct");
                    opt.current.classList.remove("wrong");
                    return null
                })
            } else {
                setResult(true)
            }

        }
    }
    function reset(params) {
        setResult(false)
        setIndex(0)
        setLock(false)
        setScore(0)
        
    }
}

export default Quiz