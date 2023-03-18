import Header from '../Header'

import './index.css'

const Home = () => {
  console.log('Home Route Rendering')
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="heading-title">Find the Job That Fits Your Life</h1>
        <p className="paragraph">
          million of people are searching for jobs, salary reviews , company
          reviews, Find the job that fits your abilities and potential
        </p>
        <button type="button" className="find-jobs-button">
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
