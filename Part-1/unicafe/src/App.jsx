import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={`${props.positive} %`} />
        </tbody>
      </table>)
  }

}

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const setGoodValue = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const setNeutralValue = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const setBadValue = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }


  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setGoodValue} text="good" />
      <Button handleClick={setNeutralValue} text="neutral" />
      <Button handleClick={setBadValue} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App
