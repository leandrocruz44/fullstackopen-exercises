const Header = ({ parts }) => {
  return (
    <h1>{parts.name}</h1>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>{part} - {exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>  
  )
}

const Total = ({ parts }) => {
  const number = parts.map(part => part.exercises).reduce((prev, cur) => prev + cur)
  return (
    <p style={{fontWeight: 'bold'}}>
      total of {number} exercises
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header parts={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course

  