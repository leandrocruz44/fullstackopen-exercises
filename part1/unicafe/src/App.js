import { useState } from 'react'

const Head = (props) => <h1>{props.text}</h1>
  


const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>


const StatisticLine = (props) =>(
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
)


const Statistics = (props) => {
  if (props.value4 === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={props.text1} value={props.value1} />
          <StatisticLine text={props.text2} value={props.value2} />
          <StatisticLine text={props.text3} value={props.value3} />
          <StatisticLine text={props.text4} value={props.value4} />
          <StatisticLine text={props.text5} value={props.value5} />
          <StatisticLine text={props.text6} value={props.value6} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  const handleClick = (statistic, setStatistic) => setStatistic(statistic + 1)

  return (
    <div>
      <Head text='give feedback' />
      <Button handleClick={() => handleClick(good, setGood)} text='good'/>
      <Button handleClick={() => handleClick(neutral, setNeutral)} text='neutral'/>
      <Button handleClick={() => handleClick(bad, setBad)} text='bad'/>
      <Head text='statistics' />
      <Statistics 
        text1='good' value1={good}
        text2='neutral' value2={neutral}
        text3='bad' value3={bad}
        text4='all' value4={all}
        text5='average' value5={average}
        text6='positive' value6={positive + '%'}
      />
    </div>
  )
}

export default App

